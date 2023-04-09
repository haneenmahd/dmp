## What is dmp?

DMP - Docker + Mongo + Prisma

`dmp` is a npm package to configure and create a new Prisma project with a MongoDB replica set configured with Docker locally. It automates the task of having to configure the project from scratch and debugging config files later.

### Usage

It's easy to get started and you can just provide where do you want to create your new project.

```sh
npx create-dmp ./my-prisma-project
```

Wait for some seconds while it copies some files and installs the packages and tools to get you ready.

After running it, you need to spin up the Docker container for the database using `docker-compose` and also pull the contents of the database by running `npx prisma db pull` inside the project.
