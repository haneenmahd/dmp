#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const { execSync } = require('child_process');

const projectDir = process.argv[2];
const absoluteProjectPath = path.resolve(projectDir);

function copyTo(atPath, toPath) {
    /**
     * Copies a file contents from a path to another.
     */
    try {
        if (fs.lstatSync(atPath).isDirectory()) {
            fse.copySync(atPath, toPath);
        } else {
            fs.copyFileSync(atPath, toPath);
        }
    } catch (err) {
        console.error(err);
    }
}

function applyTemplate(fromPath, targetDir) {
    /**
     * Copies files from the `template` directory to the target directory.
     */
    const fromPathContents = fs.readdirSync(fromPath);

    for (const content of fromPathContents) {
        const absolutePath = path.join(fromPath, content);
        const writePath = path.join(targetDir, content);

        copyTo(absolutePath, writePath);
    }
}

function detectPkgManager(targetDir) {
    let pkg = 'npm';
    const dirContents = fs.readdirSync(targetDir);

    for (const content of dirContents) {
        if (content === 'yarn.lock') {
            pkg = 'yarn';
        } else if (content === 'pnpm-lock.yaml') {
            pkg = 'pnpm';
        } else {
            pkg = 'npm';
        }
    }

    return pkg;
}

function pkgInstall(projectDir) {
    const pkgManager = detectPkgManager(projectDir);

    execSync(`${pkgManager} init -y`, { cwd: projectDir });
    execSync(`${pkgManager} install`, { cwd: projectDir });
    execSync(`${pkgManager} install -D prisma`, { cwd: projectDir });
    execSync(`${pkgManager} install @prisma/client`, { cwd: projectDir });
}

function main() {
    applyTemplate('./template', projectDir);
    pkgInstall(absoluteProjectPath);
    console.log('Start the docker container by running `docker-compose up -d`');
    console.log('Pull schema from db `npx prisma db pull`');
}

main()