# be4breach Web Platform

Production-ready platform for the be4breach public cybersecurity brand site and the be4breach Enterprise portal.

## Structure

```
frontend/   # Next.js App Router + Tailwind + Framer Motion
backend/    # FastAPI + SQLAlchemy + JWT + Google SSO
```

## Local development

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Notes

- Google SSO is optional and fail-safe (enable by configuring env keys).
- Role-based access control is enforced in backend and frontend.
