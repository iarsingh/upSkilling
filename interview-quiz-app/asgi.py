"""Production entrypoint: exports the Flet app as an ASGI app so it can be
served by uvicorn in a container, instead of Flet's dev server used by
`flet run`. See interview-quiz-app/README.md and the sibling
cicd-pipeline-jenkins-terraform-ansible-k8s project for how this gets built
and deployed.

Run with: uvicorn asgi:app --host 0.0.0.0 --port 8080
"""
import flet as ft

from src.ui.app import AppController


async def main(page: ft.Page) -> None:
    page.title = "Interview Prep Quiz"
    page.theme_mode = ft.ThemeMode.SYSTEM
    page.padding = 16

    controller = AppController(page)
    await controller.show_home()


app = ft.app(main, export_asgi_app=True)
