# Be4Breach Enterprise Monorepo

Enterprise-grade cybersecurity SaaS platform with a Next.js frontend and a
FastAPI backend.

## Structure

```
be4breach-enterprise/
  frontend/    # Next.js App Router UI
  backend/     # FastAPI + JWT + RBAC API
```

## Frontend (Next.js)

Requirements: Node.js 20+

```bash
cd frontend
nvm use
npm install
npm run dev
```

The UI runs at `http://localhost:3000`.

## Backend (FastAPI)

Requirements: Python 3.11+

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`.

### Health checks

- `GET /health`
- `GET /api/v1/health`

### Auth endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/auth/google`
- `POST /api/v1/auth/google/callback`
- `GET /api/v1/auth/me`
- `GET /api/v1/admin/overview` (ADMIN only)

### Demo credentials

These are seeded for local development:

- `admin@be4breach.com` / `AdminPassword123!`
- `analyst@be4breach.com` / `AnalystPassword123!`

## Notes

- JWT tokens include role claims (`USER`, `ADMIN`).
- CORS is locked to `FRONTEND_ORIGIN` from the backend `.env`.
