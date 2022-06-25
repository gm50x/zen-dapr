<div style="display:flex; justify-content: space-around; align-items: center">
  <h2 style="font-size: 5rem;">Zen</h2>
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  </p>
</div>

## Description

NestJS Monorepo powered by Dapr, Prisma and Docker (and K8S for deployments).

## Features

- Unified Configurator (Configurator from @zen/config)
- DaprModule with a Service for simplified communication with the [dapr](https://dapr.io/) sidecars for simple secrets, state and publishing feature.
- Easy topic subscriptions intermediated by dapr via the DaprModule.subscribe dynamic module.
- Prisma using secrets from Dapr (collected asynchronously during startup)
- Prisma schema segregated per APP in the monorepo (prisma files are inside the applications corresponding directory)
- Automatic migrations runner from compose file.

## Comming Soon

- Authorizer application for distributed Auth Guard with multiple authorities
- Blog scope application with Users, Posts, Commets
- Mailer app for sending transactional emails with tokens and others
- Notificator app sending notifications via webhooks (slack, discord, teams)

## Getting Started

We are using Docker 🐋 for running the environments properly with the segregated applications environments.

```bash
# Map secrets and variables from .env.template and secrets.template.json

# install the dependencies
$ npm install

# start postgres
$ docker compose up -d pgsql

# navigate through the app folds and run the required migrations with prisma
$ npx prisma migrate deploy

# start the rest of the applications
$ docker compose up -d
```
## License

Nest is [MIT licensed](LICENSE).
