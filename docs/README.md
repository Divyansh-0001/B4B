# Be4Breach Platform Documentation

Welcome to the Be4Breach Platform documentation.

## Overview

Be4Breach Platform is a production-ready monorepo featuring a modern frontend and backend architecture.

## Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Features**: Video background support

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.12
- **ORM**: SQLAlchemy 2 (async)
- **Validation**: Pydantic v2
- **Authentication**: JWT (python-jose)
- **Database**: PostgreSQL with asyncpg

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+
- PostgreSQL

### Quick Start

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. Configure environment variables
5. Start services:
   ```bash
   # Frontend (from root)
   npm run dev:frontend
   
   # Backend (from root)
   npm run dev:backend
   ```

## Project Structure

```
be4breach-platform/
├── frontend/         # Next.js frontend application
├── backend/          # FastAPI backend application
├── docs/             # Documentation
├── package.json      # Root package configuration
└── .gitignore        # Git ignore rules
```

## Development

### Frontend Development
See [frontend/README.md](../frontend/README.md)

### Backend Development
See [backend/README.md](../backend/README.md)

## Production Deployment

Documentation for production deployment will be added here.

## Contributing

Guidelines for contributing will be added here.

## License

License information will be added here.
