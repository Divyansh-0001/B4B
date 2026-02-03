# Be4Breach Platform - Backend

FastAPI backend application with SQLAlchemy 2, Pydantic v2, and JWT authentication.

## Tech Stack

- Python 3.12
- FastAPI
- SQLAlchemy 2 (async)
- Pydantic v2
- JWT Authentication (python-jose)
- PostgreSQL (asyncpg)

## Getting Started

### Prerequisites

- Python 3.12+
- PostgreSQL database

### Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

## API Documentation

When running in development mode, interactive API documentation is available at:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   └── v1/          # API v1
│   │       ├── endpoints/
│   │       └── api.py
│   ├── core/            # Core functionality
│   │   ├── config.py    # Configuration
│   │   └── security.py  # Security utilities
│   ├── db/              # Database
│   │   ├── base.py      # Base model
│   │   └── session.py   # Session management
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   └── main.py          # FastAPI application
├── tests/               # Tests
├── requirements.txt     # Dependencies
└── .env.example         # Environment template
```

## Testing

```bash
pytest
```
