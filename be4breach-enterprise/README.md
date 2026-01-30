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
npm run dev -- --hostname 0.0.0.0 --port 3000
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
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API runs at `http://localhost:8000`.

## Environment variables

### Frontend

Create `frontend/.env.local`:

```
BACKEND_URL=http://localhost:8000
```

### Backend

Start from `.env.example` and customize:

```
APP_NAME="Be4Breach Enterprise API"
ENVIRONMENT="development"
API_V1_PREFIX="/api/v1"
SECRET_KEY="CHANGE_ME_SUPER_SECRET"
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=14
FRONTEND_ORIGIN="http://localhost:3000"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
GOOGLE_REDIRECT_URI="http://localhost:8000/api/v1/auth/google/callback"
RATE_LIMIT_PER_MINUTE=120
AUTH_RATE_LIMIT_PER_MINUTE=20
SSO_STATE_TTL_SECONDS=600
SSO_EXCHANGE_TTL_SECONDS=300
```

### Health checks

- `GET /health`
- `GET /api/v1/health`

### Auth endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/google`
- `GET /api/v1/auth/google/callback` (SSO redirect)
- `POST /api/v1/auth/google/exchange`
- `GET /api/v1/auth/me`
- `GET /api/v1/admin/overview` (ADMIN only)

### Demo credentials

These are seeded for local development:

- `admin@be4breach.com` / `AdminPassword123!`
- `analyst@be4breach.com` / `AnalystPassword123!`

## Notes

- JWT tokens include role claims (`USER`, `ADMIN`).
- CORS is locked to `FRONTEND_ORIGIN` from the backend `.env`.
- For remote port forwarding, ensure ports `3000` and `8000` are exposed.
