```md
# NestJS Monorepo – Document Ingestion PoC

This repository demonstrates a Proof of Concept (PoC) application built using the **NestJS monorepo architecture**. It simulates a document processing pipeline with **RBAC**, **JWT authentication**, **microservices**, and **background processing** using **Bull**.

## Features

- **NestJS Monorepo** using `@nrwl/nx` structure
- **Docker & Docker Compose** for local development and deployment
- **JWT Authentication** (Login, Register, Logout)
- **Role-Based Access Control** (Admin, Editor, Viewer)
- **Document Upload & Retrieval**
- **Mock Ingestion Microservice**
  - Redis transport
  - Bull for background processing
- **Swagger Documentation** for API exploration
```

## ⚙️ Setup Instructions

### 1. Clone and Build

```bash
git clone git@github.com:pratik-gohil/jktech-nestjs-poc.git
cd jktech-nestjs-poc
docker-compose up --build
```

This will start the following:

- API Gateway (NestJS REST app)
- Ingestion Microservice (NestJS microservice using Redis transport)
- PostgreSQL
- Redis

---

## 🧪 Sample Login

Use the following credentials to log in as admin:

email: admin@example.com
password: admin123

Note: Admin user is seeded on startup

---

## 🔐 Authentication & Authorization

- JWT Authentication using Passport.js
- Role-based route guards using custom `@Roles()` decorator and guard
- Roles supported:
  - **Admin**: Manage users, documents, and ingestion
  - **Editor**: Full document access and can trigger ingestion
  - **Viewer**: Read-only access to documents and ingestion status

---

## 📄 Document Handling

- Users can upload documents (secured by role)
- Files are stored on the filesystem
- Metadata is stored in PostgreSQL via Prisma ORM
- Endpoints are protected via JWT + Role guards

---

## ⚙️ Ingestion Microservice

- **Redis-based** NestJS microservice
- Listens to document ingestion jobs from Bull queue
- Simulates processing with delayed background task
- Updates status in the database

> Triggered by API Gateway using `ClientProxy` and `ingestionQueue.add(...)`

---

## 🧬 Background Processing with Bull

- `BullModule` is configured with Redis
- `@Processor` handles ingestion jobs
- Once triggered, status is immediately set to `PROCESSING` and then later updated to `SUCCESS` or `FAILED`

---

## 🧪 Testing

Run tests using:

```bash
npm run test
```

Unit and E2E tests are included for core modules.

---

## 🧾 Swagger Docs

Available at:

```
http://localhost:3000/api
```

View all secured endpoints, models, and responses in Swagger UI.

---

## ✅ Roles Summary

| Role    | Capabilities                                        |
|---------|-----------------------------------------------------|
| Admin   | Manage users, documents, ingestion                  |
| Editor  | Create/Update/Delete documents, trigger ingestion   |
| Viewer  | Read documents and ingestion status                 |

---

## Tech Stack

- **NestJS** (Monorepo via Nx)
- **Docker & Docker Compose**
- **PostgreSQL + Prisma ORM**
- **Redis + Bull (Queue)**
- **Swagger**
- **Passport.js (JWT Strategy)**

---

## Notes

- All secrets/configs are managed via `.env` files
- Prisma migrations can be created using `npx prisma migrate dev`
- Files are saved inside the container at `uploads/`

---