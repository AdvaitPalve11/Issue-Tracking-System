# Frontend

React + Vite frontend for Issue Tracker.

## Run locally

From repository root:

```powershell
npm.cmd --prefix frontend install
npm.cmd --prefix frontend run dev
```

Optional local env file (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Build for deployment

```powershell
npm.cmd --prefix frontend run build
```

Production files are generated in `frontend/dist`.

## Deployment

- GitHub Pages workflow file: `.github/workflows/frontend-pages.yml`
- Required repository variable: `VITE_API_BASE_URL`
