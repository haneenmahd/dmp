import sys
import os
from src.apply_template import apply_template
from src.pkg_install import pkg_install

project_dir = sys.argv[1]
absolute_project_path = os.path.realpath(project_dir)

def main():
    pkg_install(absolute_project_path)
    apply_template('./template', project_dir)
    print()
    print("Start the docker container by running `docker-compose up -d`")

if __name__ == "__main__":
    main()