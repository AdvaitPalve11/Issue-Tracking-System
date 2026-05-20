Run instructions (local dev)

Frontend (bundled node):

```powershell
# from repository root
Set-Location .\frontend
$env:Path = "$(Resolve-Path .\node)\;" + $env:Path
.\node\npm.cmd install
$env:Path = "$(Resolve-Path .\node)\;" + $env:Path
.\node\npm.cmd run dev
```

Backend (provided JDK):

```powershell
# from repository root
$env:JAVA_HOME = 'C:\java_OpenJDK\javaOpenJDK'
$env:Path = "$env:JAVA_HOME\\bin;$env:Path"
.\mvnw.cmd -DskipTests spring-boot:run
```

Docker (alternative):

```powershell
Copy-Item .env.server.example .env
docker compose up -d --build
```

Notes:
- The frontend uses `VITE_API_BASE_URL` or defaults to `http://localhost:8080`.
- The repository ships a bundled Node runtime at `frontend/node` (use it to avoid installing Node globally).
- If PowerShell prompts about running scripts (PSReadLine), allow once or run via `cmd.exe` to avoid profile script prompts.
