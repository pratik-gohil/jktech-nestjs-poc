# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["npm", "run", "start:prod"]



# Stage 1: Build all apps
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY . .

RUN npm install

# Build both apps
RUN npm run build api && npm run build ingestion

# Stage 2: Create separate runtime images

# API App
FROM node:18-alpine as api-runner
WORKDIR /app
COPY --from=builder /app/dist/apps/api ./dist
COPY package*.json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
CMD ["node", "dist/main"]

# Ingestion App
FROM node:18-alpine as ingestion-runner
WORKDIR /app
COPY --from=builder /app/dist/apps/ingestion ./dist
COPY package*.json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
CMD ["node", "dist/main"]