# Frontend

React + Vite frontend for Issue Tracker.

## Run locally

From repository root:

```powershell
npm.cmd --prefix frontend install
npm.cmd --prefix frontend run dev
```

## Build for deployment

```powershell
npm.cmd --prefix frontend run build
```

Production files are generated in `frontend/dist`.

## GitHub Pages deployment

This repo includes GitHub Actions workflow `.github/workflows/frontend-pages.yml`.

Before deploying, set repository variable:

- `VITE_API_BASE_URL` = your backend URL (for example, `https://issuetracker-backend.onrender.com`)

Then push to `main`.
