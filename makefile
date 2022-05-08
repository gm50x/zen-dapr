# Usage:
# make start app=<app-name>
# make start-build app=<app-name>
# make stop-all
start:
	docker compose up -d ${app} ${app}-dapr 

start-build:
	docker compose up --build -d ${app} ${app}-dapr 

stop-all:
	docker compose down