import os
import shutil
from config import FILE_CATEGORIES
from utils import create_folder, get_unique_filename

def get_category(extension):
    for category, extensions in FILE_CATEGORIES.items():
        if extension in extensions:
            return category
    return "Others"

def organize(source_folder):
    summary = {}

    for file in os.listdir(source_folder):
        file_path = os.path.join(source_folder, file)

        if os.path.isfile(file_path):
            _, ext = os.path.splitext(file)
            category = get_category(ext.lower())

            dest_folder = os.path.join(source_folder, category)
            create_folder(dest_folder)

            new_name = get_unique_filename(dest_folder, file)
            shutil.move(file_path, os.path.join(dest_folder, new_name))

            summary[category] = summary.get(category, 0) + 1

    return summary