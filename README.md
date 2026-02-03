# Be4Breach Platform

Production-ready monorepo for the Be4Breach Platform.

## Overview

A modern full-stack platform built with Next.js and FastAPI following clean architecture principles.

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- Video background support

### Backend
- **Python 3.12** - Modern Python
- **FastAPI** - High-performance web framework
- **SQLAlchemy 2** - Async ORM
- **Pydantic v2** - Data validation
- **JWT Authentication** - Secure token-based auth

## Project Structure

```
be4breach-platform/
├── frontend/         # Next.js application
├── backend/          # FastAPI application
├── docs/             # Documentation
├── package.json      # Monorepo configuration
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Python 3.12+
- PostgreSQL (for backend database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd be4breach-platform
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Development

**Frontend (from root directory)**
```bash
npm run dev:frontend
```
Access at: http://localhost:3000

**Backend (from root directory)**
```bash
npm run dev:backend
```
Access at: http://localhost:8000

API docs: http://localhost:8000/docs

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## Features

- ✅ Clean architecture
- ✅ Production-ready setup
- ✅ TypeScript for type safety
- ✅ Async/await throughout
- ✅ JWT authentication
- ✅ API documentation (Swagger/ReDoc)
- ✅ Modern UI framework ready
- ✅ Database ORM with migrations support
- ✅ Environment-based configuration

## Development Principles

- Clean code architecture
- Type safety (TypeScript, Pydantic)
- Async-first approach
- Comprehensive error handling
- Security best practices
- Scalable structure

## Scripts

From the root directory:

- `npm run dev:frontend` - Start frontend dev server
- `npm run dev:backend` - Start backend dev server
- `npm run build:frontend` - Build frontend for production
- `npm run install:frontend` - Install frontend dependencies
- `npm run install:backend` - Install backend dependencies

## License

TBD

## Contributing

TBD
