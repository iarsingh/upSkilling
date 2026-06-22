import os

def create_folder(path):
    os.makedirs(path, exist_ok=True)

def get_unique_filename(destination, filename):
    name, ext = os.path.splitext(filename)
    counter = 1
    while os.path.exists(os.path.join(destination, filename)):
        filename = f"{name}_{counter}{ext}"
        counter += 1
    return filename