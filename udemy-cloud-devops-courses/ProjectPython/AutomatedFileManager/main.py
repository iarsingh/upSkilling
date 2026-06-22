from config import SOURCE_FOLDER
from organizer import organize

def main():
    summary = organize(SOURCE_FOLDER)
    print("\n📊 Summary:")
    for k, v in summary.items():
        print(f"{k}: {v} file(s)")

if __name__ == "__main__":
    main()