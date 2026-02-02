## Be4Breach Monorepo

Production-grade foundation for the Be4Breach cybersecurity platform.

### Structure

```
be4breach/
├── frontend/   # Next.js App Router (TypeScript, Tailwind, Shadcn UI)
├── backend/    # FastAPI (Python 3.12, SQLAlchemy, Alembic)
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App will start on: `http://localhost:3000`

---

## Backend

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API will start on: `http://localhost:8000`

### API Docs

- Swagger UI: `http://localhost:8000/api/v1/docs`
- OpenAPI JSON: `http://localhost:8000/api/v1/openapi.json`

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`
- `GET /api/v1/auth/google/login`
- `GET /api/v1/auth/google/callback`

Google OAuth requires environment variables in `backend/.env`.

---

## Database

The backend defaults to SQLite for local development:

```
DATABASE_URL="sqlite:///./data/be4breach.db"
```

To run migrations:

```bash
cd backend
alembic upgrade head
```
