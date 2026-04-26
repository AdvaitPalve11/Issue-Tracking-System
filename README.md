# Issue Tracker

This repository contains:

- A Spring Boot backend API under `src/main/java`
- A React + Vite frontend under `frontend/`

## Quick Start (Local)

### 1) Backend

From the repository root:

```powershell
set DB_URL=jdbc:postgresql://localhost:5432/issuetracker
set DB_USERNAME=postgres
set DB_PASSWORD=your_password
mvnw.cmd spring-boot:run
```

Backend runs on `http://localhost:8080`.

Public endpoints:

- `POST /auth/register`
- `POST /auth/login`

Protected endpoints (require Basic Auth with registered email/password):

- `/issues/**`
- `/users/**`

### 2) Frontend

From the repository root:

```powershell
npm.cmd --prefix frontend install
npm.cmd --prefix frontend run dev
```

Frontend runs on `http://localhost:5173`.

## Build & Test

Run these from the repository root:

```powershell
mvnw.cmd test
npm.cmd --prefix frontend run build
```

## Deploy With GitHub + Render

This repository is now configured with:

- CI workflow: `.github/workflows/ci.yml`
- Frontend GitHub Pages deploy workflow: `.github/workflows/frontend-pages.yml`
- Render backend blueprint: `render.yaml`

### 1) Push code to GitHub

Push to `main` and GitHub Actions will automatically run backend tests and frontend build.

### 2) Deploy frontend on GitHub Pages

In GitHub repository settings:

1. Open **Settings > Pages**.
2. Set **Build and deployment** source to **GitHub Actions**.
3. Open **Settings > Secrets and variables > Actions > Variables**.
4. Add `VITE_API_BASE_URL` with your deployed backend URL, for example: `https://issuetracker-backend.onrender.com`.

After that, each push to `main` touching frontend files deploys to:

- `https://<your-github-username>.github.io/<your-repo-name>/`

### 3) Deploy backend on Render

1. In Render, choose **New + > Blueprint**.
2. Connect this GitHub repository.
3. Render will detect `render.yaml` and create:
	- Web service: `issuetracker-backend`
	- PostgreSQL database: `issuetracker-db`
4. Update environment variable `ALLOWED_ORIGINS` in Render to your GitHub Pages origin:
	- `https://<your-github-username>.github.io`
5. Deploy.

Backend uses these env vars:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `ALLOWED_ORIGINS`
- `PORT` (provided automatically by Render)

## Notes

- Backend auth uses HTTP Basic:
  - Public: `POST /auth/register`, `POST /auth/login`
  - Protected: `/issues/**`, `/users/**`
- CORS is configurable through `ALLOWED_ORIGINS` (comma-separated).
