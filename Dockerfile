FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY . .

RUN npm install
RUN npx prisma generate

RUN npm run build api-gateway && npm run build ingestion

# API Gateway App
FROM node:18-alpine AS api-runner
WORKDIR /app
COPY --from=builder /app/dist/apps/api-gateway ./dist
COPY package*.json ./
COPY ./prisma prisma
RUN npm install --omit=dev
ENV NODE_ENV=production
CMD ["npm", "run", "start:migrate:prod"]

# Ingestion App
FROM node:18-alpine AS ingestion-runner
WORKDIR /app
COPY --from=builder /app/dist/apps/ingestion ./dist
COPY package*.json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
CMD ["node", "dist/main"]