import os
import shutil

def copy_to(at_path: str, to_path: str):
    """
    Copies a file contens from a path to another.
    """
    try:
        if os.path.isdir(at_path):
            shutil.copytree(at_path, to_path)
        else:
            shutil.copy(at_path, to_path)
    except:
        pass

def apply_template(from_path: str, target_dir: str):
    """
    Copies files from the `template` directory to the target directory.
    """
    from_path_contents = os.listdir(from_path)

    for content in from_path_contents:
        absolute_path = os.path.join(from_path, content)
        write_path = os.path.join(target_dir, content)

        copy_to(absolute_path, write_path)