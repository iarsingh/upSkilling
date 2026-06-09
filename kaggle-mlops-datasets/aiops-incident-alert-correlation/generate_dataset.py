from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parents[2]
runpy.run_path(str(ROOT / 'scripts' / 'create_portfolio_datasets.py'), run_name='__main__')
