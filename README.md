# Issue Tracker

Issue Tracker is an open-source full-stack app with:

- Spring Boot backend API (`src/main/java`)
- React + Vite frontend (`frontend/`)

## Run On Any Server (Fastest)

This repository includes Docker deployment files so anyone can clone and run directly on a VPS.

### One-Time Server Setup

Install Docker Engine and Docker Compose on the server.

### Download And Start

```bash
git clone https://github.com/AdvaitPalve11/Issue-Tracking-System.git
cd Issue-Tracking-System
cp .env.server.example .env
docker compose up -d --build
```

On Windows PowerShell:

```powershell
git clone https://github.com/AdvaitPalve11/Issue-Tracking-System.git
cd Issue-Tracking-System
Copy-Item .env.server.example .env
docker compose up -d --build
```

1. Install Docker and Docker Compose on the server.
2. Clone repository.
3. Copy environment template and edit values.
4. Start services.

```bash
cp .env.server.example .env
docker compose up -d --build
```

Default ports:

- Backend API: `http://<server-ip>:8080`
- PostgreSQL: internal container network only

### First Use (Sign Up + Login)

1. Sign up with `POST /auth/register`
2. Login with `POST /auth/login`
3. Use returned email/password for HTTP Basic auth on protected routes

Quick test:

```bash
curl -X POST http://<server-ip>:8080/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Admin","email":"admin@example.com","password":"Secret123!"}'

curl -X POST http://<server-ip>:8080/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"admin@example.com","password":"Secret123!"}'
```

## Environment Variables (Server)

Set these in `.env` for server deployment:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `ALLOWED_ORIGINS`

For production, update `POSTGRES_PASSWORD` and set `ALLOWED_ORIGINS` to your frontend domain.

The backend container maps these into:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

## Local Development

### Backend

```powershell
set DB_URL=jdbc:postgresql://localhost:5432/issuetracker
set DB_USERNAME=postgres
set DB_PASSWORD=your_password
mvnw.cmd spring-boot:run
```

### Frontend

```powershell
npm.cmd --prefix frontend install
npm.cmd --prefix frontend run dev
```

## Build & Test

```powershell
mvnw.cmd test
npm.cmd --prefix frontend run build
```

## GitHub Workflows

- CI: `.github/workflows/ci.yml`
- Frontend Pages deploy: `.github/workflows/frontend-pages.yml`

If deploying frontend via GitHub Pages, set repository variable `VITE_API_BASE_URL`.

## Security

Please review [SECURITY.md](SECURITY.md) before reporting vulnerabilities.
