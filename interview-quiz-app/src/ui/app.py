import random
from dataclasses import replace

import flet as ft

from src.data_loader import questions_by_topic, topics
from src.mcq_loader import mcq_questions_by_topic, mcq_topics
from src.models import MCQQuestion, Question, Rating
from src.scheduler import schedule_next_review
from src.storage import ReviewStore

MCQ_SESSION_SIZE = 20


def _shuffled_mcq(q: MCQQuestion) -> MCQQuestion:
    """Returns a copy with option order (and correct_index) randomized per
    session, so the correct answer isn't always in the same position."""
    order = list(range(len(q.options)))
    random.shuffle(order)
    return replace(
        q,
        options=tuple(q.options[i] for i in order),
        correct_index=order.index(q.correct_index),
    )


class AppController:
    """Owns the single Page and swaps its content between four screens:
    topic list -> flashcard session -> stats, plus a parallel MCQ practice
    mode. Small enough that separate view classes/files would just add
    indirection without real benefit."""

    def __init__(self, page: ft.Page):
        self.page = page
        self.store = ReviewStore(page)

        # flashcard session state
        self.topic: str | None = None
        self.queue: list[Question] = []
        self.index: int = 0
        self.flipped: bool = False
        self.hint_shown: bool = False

        # MCQ session state
        self.mcq_topic: str | None = None
        self.mcq_queue: list[MCQQuestion] = []
        self.mcq_index: int = 0
        self.mcq_selected: int | None = None
        self.mcq_score: int = 0

    # ---- navigation ----------------------------------------------------

    async def show_home(self) -> None:
        self.page.controls.clear()
        self.page.appbar = ft.AppBar(
            title=ft.Text("Interview Prep"),
            center_title=True,
            actions=[
                ft.IconButton(
                    ft.Icons.QUIZ,
                    tooltip="MCQ Practice",
                    on_click=lambda e: self.page.run_task(self.show_mcq_topics),
                ),
                ft.IconButton(
                    ft.Icons.BAR_CHART,
                    tooltip="Stats",
                    on_click=lambda e: self.page.run_task(self.show_stats),
                ),
            ],
        )

        tiles = []
        for topic in topics():
            qs = questions_by_topic(topic)
            due = await self.store.due_question_ids([q.id for q in qs])
            tiles.append(
                ft.ListTile(
                    title=ft.Text(topic),
                    subtitle=ft.Text(f"{len(qs)} questions · {len(due)} due"),
                    trailing=ft.Icon(ft.Icons.CHEVRON_RIGHT),
                    on_click=lambda e, t=topic: self.page.run_task(
                        self.show_flashcards, t
                    ),
                )
            )

        self.page.add(
            ft.Column(
                [ft.ListView(tiles, expand=True, spacing=2)],
                expand=True,
            )
        )
        self.page.update()

    async def show_flashcards(self, topic: str) -> None:
        self.topic = topic
        qs = questions_by_topic(topic)
        due_ids = set(await self.store.due_question_ids([q.id for q in qs]))
        # Study the due set; if nothing's due yet, offer a fresh batch anyway
        # so a topic never feels like a dead end.
        self.queue = [q for q in qs if q.id in due_ids] or qs[:20]
        self.index = 0
        self.flipped = False
        self.hint_shown = False
        await self._render_flashcard()

    async def show_stats(self) -> None:
        self.page.controls.clear()
        self.page.appbar = ft.AppBar(
            title=ft.Text("Progress"),
            leading=ft.IconButton(
                ft.Icons.ARROW_BACK, on_click=lambda e: self.page.run_task(self.show_home)
            ),
        )

        # A 4-column DataTable doesn't fit a phone-width viewport (the last
        # column clips off the edge), so use stacked ListTiles like Home instead.
        tiles = []
        for topic in topics():
            qs = questions_by_topic(topic)
            stats = await self.store.stats([q.id for q in qs])
            tiles.append(
                ft.ListTile(
                    title=ft.Text(topic),
                    subtitle=ft.Text(
                        f"{stats['total']} total · {stats['reviewed']} reviewed · "
                        f"{stats['learned']} learned"
                    ),
                )
            )

        self.page.add(ft.Column([ft.ListView(tiles, expand=True, spacing=2)], expand=True))
        self.page.update()

    # ---- flashcard session ----------------------------------------------

    async def _render_flashcard(self) -> None:
        self.page.controls.clear()
        self.page.appbar = ft.AppBar(
            title=ft.Text(self.topic or ""),
            leading=ft.IconButton(
                ft.Icons.ARROW_BACK, on_click=lambda e: self.page.run_task(self.show_home)
            ),
        )

        if self.index >= len(self.queue):
            self.page.add(
                ft.Column(
                    [
                        ft.Text("All done for now! 🎉", size=22),
                        ft.ElevatedButton(
                            "Back to topics",
                            on_click=lambda e: self.page.run_task(self.show_home),
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.CENTER,
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    expand=True,
                )
            )
            self.page.update()
            return

        q = self.queue[self.index]
        body = [
            ft.Text(q.subcategory, size=12, color=ft.Colors.GREY),
            ft.Text(q.question, size=18, weight=ft.FontWeight.W_600),
        ]
        if self.hint_shown and not self.flipped:
            body += [
                ft.Text(f"Hint: {q.hint}", size=14, italic=True, color=ft.Colors.AMBER_700)
            ]
        if self.flipped:
            body += [ft.Divider(), ft.Text(q.answer, size=15)]

        card = ft.Container(
            content=ft.Column(body, spacing=12, scroll=ft.ScrollMode.AUTO),
            padding=24,
            border_radius=12,
            bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,
            expand=True,
        )

        if not self.flipped:
            action = ft.Row(
                [
                    ft.OutlinedButton(
                        "Show Hint",
                        disabled=self.hint_shown,
                        on_click=lambda e: self.page.run_task(self._show_hint),
                    ),
                    ft.ElevatedButton(
                        "Show Answer",
                        on_click=lambda e: self.page.run_task(self._flip),
                    ),
                ],
                alignment=ft.MainAxisAlignment.SPACE_EVENLY,
            )
        else:
            action = ft.Row(
                [
                    ft.ElevatedButton(
                        "Again",
                        bgcolor=ft.Colors.RED_200,
                        on_click=lambda e: self.page.run_task(self._rate, Rating.AGAIN),
                    ),
                    ft.ElevatedButton(
                        "Good",
                        bgcolor=ft.Colors.AMBER_200,
                        on_click=lambda e: self.page.run_task(self._rate, Rating.GOOD),
                    ),
                    ft.ElevatedButton(
                        "Easy",
                        bgcolor=ft.Colors.GREEN_200,
                        on_click=lambda e: self.page.run_task(self._rate, Rating.EASY),
                    ),
                ],
                alignment=ft.MainAxisAlignment.SPACE_EVENLY,
            )

        self.page.add(
            ft.Column(
                [
                    ft.Text(f"{self.index + 1} / {len(self.queue)}", size=12),
                    card,
                    action,
                ],
                expand=True,
            )
        )
        self.page.update()

    async def _show_hint(self) -> None:
        self.hint_shown = True
        await self._render_flashcard()

    async def _flip(self) -> None:
        self.flipped = True
        await self._render_flashcard()

    async def _rate(self, rating: Rating) -> None:
        q = self.queue[self.index]
        state = await self.store.get(q.id)
        await self.store.save(schedule_next_review(state, rating))
        self.index += 1
        self.flipped = False
        self.hint_shown = False
        await self._render_flashcard()

    # ---- MCQ practice ----------------------------------------------------

    async def show_mcq_topics(self) -> None:
        self.page.controls.clear()
        self.page.appbar = ft.AppBar(
            title=ft.Text("MCQ Practice"),
            leading=ft.IconButton(
                ft.Icons.ARROW_BACK, on_click=lambda e: self.page.run_task(self.show_home)
            ),
        )

        tiles = []
        for topic in mcq_topics():
            qs = mcq_questions_by_topic(topic)
            session_size = min(MCQ_SESSION_SIZE, len(qs))
            tiles.append(
                ft.ListTile(
                    title=ft.Text(topic),
                    subtitle=ft.Text(f"{len(qs)} questions in bank · {session_size} per session"),
                    trailing=ft.Icon(ft.Icons.CHEVRON_RIGHT),
                    on_click=lambda e, t=topic: self.page.run_task(self._pick_mcq_session, t),
                )
            )

        self.page.add(ft.Column([ft.ListView(tiles, expand=True, spacing=2)], expand=True))
        self.page.update()

    async def _pick_mcq_session(self, topic: str) -> None:
        total = len(mcq_questions_by_topic(topic))
        quick_size = min(MCQ_SESSION_SIZE, total)

        def pick(size: int) -> None:
            self.page.pop_dialog()
            self.page.run_task(self.start_mcq, topic, size)

        dialog = ft.AlertDialog(
            title=ft.Text(topic),
            content=ft.Text("How many questions this session?"),
            actions=[
                ft.TextButton(f"Quick · {quick_size}", on_click=lambda e: pick(quick_size)),
                ft.TextButton(f"Full bank · {total}", on_click=lambda e: pick(total)),
                ft.TextButton("Cancel", on_click=lambda e: self.page.pop_dialog()),
            ],
        )
        self.page.show_dialog(dialog)

    async def start_mcq(self, topic: str, size: int = MCQ_SESSION_SIZE) -> None:
        self.mcq_topic = topic
        pool = mcq_questions_by_topic(topic)
        sample = random.sample(pool, min(size, len(pool)))
        self.mcq_queue = [_shuffled_mcq(q) for q in sample]
        self.mcq_index = 0
        self.mcq_selected = None
        self.mcq_score = 0
        await self._render_mcq()

    async def _render_mcq(self) -> None:
        self.page.controls.clear()
        self.page.appbar = ft.AppBar(
            title=ft.Text(self.mcq_topic or ""),
            leading=ft.IconButton(
                ft.Icons.ARROW_BACK, on_click=lambda e: self.page.run_task(self.show_mcq_topics)
            ),
        )

        if self.mcq_index >= len(self.mcq_queue):
            total = len(self.mcq_queue)
            pct = round(100 * self.mcq_score / total) if total else 0
            self.page.add(
                ft.Column(
                    [
                        ft.Text("Session complete", size=22),
                        ft.Text(f"{self.mcq_score} / {total} correct ({pct}%)", size=16),
                        ft.Row(
                            [
                                ft.ElevatedButton(
                                    "Retry",
                                    on_click=lambda e: self.page.run_task(
                                        self.start_mcq, self.mcq_topic, total
                                    ),
                                ),
                                ft.OutlinedButton(
                                    "Back to topics",
                                    on_click=lambda e: self.page.run_task(self.show_mcq_topics),
                                ),
                            ],
                            alignment=ft.MainAxisAlignment.CENTER,
                        ),
                    ],
                    alignment=ft.MainAxisAlignment.CENTER,
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    expand=True,
                    spacing=16,
                )
            )
            self.page.update()
            return

        q = self.mcq_queue[self.mcq_index]
        answered = self.mcq_selected is not None

        option_buttons = []
        for i, option_text in enumerate(q.options):
            bgcolor = None
            if answered:
                if i == q.correct_index:
                    bgcolor = ft.Colors.GREEN_200
                elif i == self.mcq_selected:
                    bgcolor = ft.Colors.RED_200
            option_buttons.append(
                ft.ElevatedButton(
                    option_text,
                    bgcolor=bgcolor,
                    disabled=answered,
                    on_click=lambda e, idx=i: self.page.run_task(self._select_mcq_option, idx),
                )
            )

        body = [
            ft.Text(q.subtheme, size=12, color=ft.Colors.GREY),
            ft.Text(q.question, size=18, weight=ft.FontWeight.W_600),
            ft.Column(
                option_buttons, spacing=8, horizontal_alignment=ft.CrossAxisAlignment.STRETCH
            ),
        ]
        if answered:
            body += [ft.Divider(), ft.Text(q.explanation, size=14, italic=True)]

        card = ft.Container(
            content=ft.Column(body, spacing=12, scroll=ft.ScrollMode.AUTO),
            padding=24,
            border_radius=12,
            bgcolor=ft.Colors.SURFACE_CONTAINER_HIGHEST,
            expand=True,
        )

        footer = (
            ft.ElevatedButton("Next", on_click=lambda e: self.page.run_task(self._next_mcq))
            if answered
            else ft.Text(" ")
        )

        self.page.add(
            ft.Column(
                [
                    ft.Text(
                        f"{self.mcq_index + 1} / {len(self.mcq_queue)} · Score: {self.mcq_score}",
                        size=12,
                    ),
                    card,
                    footer,
                ],
                expand=True,
            )
        )
        self.page.update()

    async def _select_mcq_option(self, index: int) -> None:
        if self.mcq_selected is not None:
            return
        self.mcq_selected = index
        q = self.mcq_queue[self.mcq_index]
        if index == q.correct_index:
            self.mcq_score += 1
        await self._render_mcq()

    async def _next_mcq(self) -> None:
        self.mcq_index += 1
        self.mcq_selected = None
        await self._render_mcq()
