FROM node:16.13-alpine3.14 AS builder
ARG target
WORKDIR /app
COPY package*.json .
COPY apps/${target}/prisma* ./prisma
RUN npm install
COPY . .
RUN npm run build -- ${target}

FROM node:16.13-alpine3.14 AS runtime
ARG target
WORKDIR /app
COPY package*.json .
COPY apps/${target}/prisma* ./prisma
RUN npm ci --only=production
COPY --from=builder /app/dist/apps/${target} ./dist
RUN apk add curl
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1
CMD ["npm", "run", "start:prod"]
