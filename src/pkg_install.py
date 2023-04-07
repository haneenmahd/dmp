import os
import subprocess

def detect_pkg_manager(target_dir: str):
    pkg = "npm"
    dir_contents = os.listdir(target_dir)

    for content in dir_contents:
        if content == "yarn.lock":
            pkg = "yarn"
        elif content == "pnpm-lock.yaml":
            pkg = "pnpm"
        else:
            pkg = "npm"

    return pkg

def pkg_install(project_dir: str):
    pkg_manager = detect_pkg_manager(project_dir)

    print(project_dir)

    subprocess.run([pkg_manager, "install"], cwd=project_dir)
    subprocess.run([pkg_manager, "install", "-D", "prisma"], cwd=project_dir)
    subprocess.run([pkg_manager, "install", "@prisma/client"], cwd=project_dir)
    subprocess.run(["npx", "prisma", "generate", "--schema=./schema/schema.prisma"], cwd=project_dir)
