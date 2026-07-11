import flet as ft

from src.ui.app import AppController


async def main(page: ft.Page) -> None:
    page.title = "Interview Prep Quiz"
    page.theme_mode = ft.ThemeMode.SYSTEM
    page.padding = 16

    controller = AppController(page)
    await controller.show_home()


ft.app(main)
