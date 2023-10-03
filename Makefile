lint: ; npm run lint
dev: ; npm run dev
nodemon: ; npm run nodemon
start-local: ; npm run build && npm run start
d-up: ; docker-compose up -d
d-up-build: ; docker-compose up -d --build --remove-orphans
d-down: ; docker-compose down
d-logs: ; docker-compose logs -f
d-ps: ; docker-compose ps