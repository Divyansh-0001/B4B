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

## Backend

- FastAPI with Pydantic v2
- JWT auth with Google OAuth
- RBAC for Operative / Partner / Command
- SQLAlchemy 2.0 (SQLite by default)

### Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment

Copy `.env.example` to `.env` and set values as needed.

## Security Notes

- JWT secret and Google OAuth credentials are loaded from environment variables.
- Role escalation is restricted to Command Authority endpoints only.

