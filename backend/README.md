# be4breach Backend (FastAPI)

Production-ready backend for the be4breach public site and enterprise portal.

## Quick start

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Key features

- FastAPI + Pydantic v2
- Async-ready SQLAlchemy 2
- JWT auth + Google SSO (optional)
- Role-based access control
- Rate limiting, secure headers, structured logging
- Graceful degradation on missing env or DB outages

## Quality

```bash
python3 -m pip install ruff
ruff check app
```
