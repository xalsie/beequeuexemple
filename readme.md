# Bee-Queu test

### requirements
- nodejs
- yarn/npm
- docker
- redis
- bee-queue

### how to run
- Redis & arena
```bash
docker compose up -d
```

- Node
```bash
docker run -it --rm --name node -v .:/usr/src/app -w /usr/src/app node:23.6-alpine3.21 sh
```

- Install dependencies
```bash
yarn
```

- Run script
```bash
yarn start
```
