<!-- ASCII only -->
# Be4Breach — Cinematic Cyber Defense Platform

Be4Breach is a futuristic, enterprise-ready cybersecurity platform with a cinematic
command-center experience. It combines a high-impact Next.js UI with a hardened
FastAPI backend featuring JWT authentication, Google OAuth, and role-based access
control (RBAC).

## Monorepo Layout

```
/
  frontend/   # Next.js (App Router, TypeScript, Tailwind, Framer Motion)
  backend/    # FastAPI (Python 3.11+, Pydantic v2)
```

## Roles

| System Role | Name in UI |
|------------|------------|
| USER       | Operative  |
| CLIENT     | Partner Organization |
| ADMIN      | Command Authority |

## Frontend

- Next.js (App Router only)
- TypeScript
- Tailwind CSS
- Framer Motion (client components)
- Cinematic cyber UI with animated grids, scan lines, and holographic panels

### Run

```bash
cd frontend
npm install
npm run dev
```

### Environment

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
GOOGLE_CLIENT_ID=your-google-client-id
```

## Backend

- FastAPI with Pydantic v2
- JWT auth with Google OAuth
- RBAC for Operative / Partner / Command
- SQLAlchemy 2.0 (SQLite by default)
- Security headers, trusted hosts, and request IDs

### Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Production (Gunicorn + Uvicorn)

```bash
cd backend
gunicorn -c gunicorn.conf.py app.main:app
```

### Environment

Copy `.env.example` to `.env` and set values as needed.

Key values:

- `JWT_SECRET` must be at least 32 characters (required in production)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` must be set together
- `CORS_ORIGINS` and `ALLOWED_HOSTS` accept comma-separated lists
- `AUTH_COOKIE_SECURE=true` is enforced automatically in production

## Security Notes

- JWT secret and Google OAuth credentials are loaded from environment variables.
- Role escalation is restricted to Command Authority endpoints only.
- `/dashboard` routes are protected by server middleware and token expiry.

