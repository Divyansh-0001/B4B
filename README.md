# Be4Breach Platform

Production-ready, full-stack cybersecurity company platform for **Be4Breach**.

## Monorepo Structure

```
apps/
  api/   # FastAPI backend
  web/   # Next.js (App Router) frontend
```

## Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (subtle, performance-safe animations)

**Backend**
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Alembic migrations
- JWT authentication
- OAuth2 (Google SSO)

## Getting Started (Local)

### 1) Backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env

# Create the database (Postgres) and run migrations
alembic upgrade head

# Run the API
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`.

### 2) Frontend

```bash
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`.

## Docker (Optional)

```bash
docker-compose up --build
```

## Environment Variables

**Backend (`apps/api/.env`)**
- `DATABASE_URL`
- `JWT_SECRET`
- `ALLOWED_ORIGINS`
- `FRONTEND_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`

**Frontend (`apps/web/.env.local`)**
- `NEXT_PUBLIC_API_URL`

## API Overview

- `GET /api/v1/health/` - Health check
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login (JWT)
- `GET /api/v1/auth/google/url` - Google SSO URL
- `GET /api/v1/auth/google/callback` - Google SSO callback
- `POST /api/v1/contact/` - Contact form submission