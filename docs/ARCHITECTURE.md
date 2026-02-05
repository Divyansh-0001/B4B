# Architecture

## Overview

Be4Breach Platform is a production-ready monorepo consisting of:

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python 3.12 with FastAPI, SQLAlchemy 2, Alembic
- **Shared**: Common types and constants
- **Docs**: Comprehensive documentation

## Directory Structure

```
be4breach-platform/
├── frontend/           # Next.js frontend application
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── public/       # Static assets
├── backend/           # FastAPI backend application
│   ├── app/
│   │   ├── api/      # API routes
│   │   ├── core/     # Core configuration
│   │   ├── db/       # Database setup
│   │   ├── models/   # SQLAlchemy models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic
│   └── alembic/      # Database migrations
├── shared/            # Shared types and constants
│   ├── types/        # TypeScript types
│   ├── constants/    # Shared constants
│   └── schemas/      # JSON schemas
└── docs/             # Documentation
```

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **Animations**: Framer Motion
- **Icons**: lucide-react

### Key Features

- Server-side rendering (SSR) and static generation (SSG)
- Client-side animations with Framer Motion
- Video background support
- Responsive design with Tailwind CSS
- Modern UI with shadcn/ui components

## Backend Architecture

### Technology Stack

- **Framework**: FastAPI
- **Language**: Python 3.12
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Validation**: Pydantic v2
- **Authentication**: JWT + OAuth2

### Key Features

- **JWT Authentication**: Secure token-based authentication
- **Google OAuth2 SSO**: Single sign-on with Google
- **Role-Based Access Control (RBAC)**:
  - Admin: Full system access
  - Client: Limited access
  - User: Basic access
- **Async/Await**: Fully asynchronous database operations
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

### Database Models

#### User Model

```python
- id: int (primary key)
- email: str (unique, indexed)
- hashed_password: str (nullable for OAuth users)
- full_name: str (nullable)
- role: UserRole (admin, client, user)
- oauth_provider: str (nullable)
- oauth_id: str (nullable)
- is_active: bool
- is_verified: bool
- created_at: datetime
- updated_at: datetime
```

### Authentication Flow

1. **Email/Password Authentication**:
   - User submits email and password
   - Backend verifies credentials
   - Returns JWT token

2. **Google OAuth2 Flow**:
   - User initiates Google login
   - Redirected to Google for authorization
   - Google redirects back with authorization code
   - Backend exchanges code for access token
   - Backend retrieves user info
   - Creates/updates user record
   - Returns JWT token

### Authorization

- JWT tokens include user ID in the payload
- Protected endpoints verify token and retrieve user
- RBAC enforced at route and business logic level
- Admin-only endpoints check for admin role

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login with email/password
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### Users

- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `GET /api/v1/users` - List all users (admin only)
- `GET /api/v1/users/{id}` - Get user by ID (admin only)
- `PUT /api/v1/users/{id}` - Update user (admin only)
- `DELETE /api/v1/users/{id}` - Delete user (admin only)

## Security Considerations

- Passwords hashed with bcrypt
- JWT tokens with expiration
- CORS properly configured
- SQL injection protection via ORM
- Input validation with Pydantic
- HTTPS recommended for production
- Environment variables for secrets
- OAuth2 state parameter for CSRF protection

## Scalability

- Async database operations
- Connection pooling
- Stateless authentication (JWT)
- Horizontal scaling ready
- CDN-friendly static assets
- Database migration system

## Development Workflow

1. Make changes to code
2. Frontend: `npm run dev`
3. Backend: `uvicorn app.main:app --reload`
4. Create database migrations: `alembic revision --autogenerate`
5. Apply migrations: `alembic upgrade head`
6. Test changes
7. Commit and push
