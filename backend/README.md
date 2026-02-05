# Be4Breach Platform - Backend API

Production-ready FastAPI backend with JWT authentication, Google OAuth2 SSO, and role-based access control.

## 🚀 Features

### Core Features
- ✅ **FastAPI** - Modern, fast Python web framework
- ✅ **Pydantic v2** - Settings management and validation
- ✅ **SQLAlchemy 2.0** - Async ORM with type hints
- ✅ **Alembic** - Database migrations
- ✅ **Structured Logging** - JSON logging with structlog
- ✅ **Error Middleware** - Crash-proof error handling
- ✅ **CORS** - Configured for frontend

### Authentication & Authorization
- ✅ **JWT Access Tokens** (30 minutes expiry)
- ✅ **JWT Refresh Tokens** (7 days expiry)
- ✅ **Secure Password Hashing** (bcrypt)
- ✅ **Google OAuth2 SSO**
- ✅ **Role-Based Access Control** (Admin, Client, User)

### Health & Monitoring
- ✅ **Health Check Endpoint** with database status
- ✅ **System Metrics** (CPU, memory, disk)
- ✅ **Structured Logging** with request tracking
- ✅ **Request/Response Logging**

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── users.py      # User management
│   │   └── deps.py       # Dependencies
│   ├── core/             # Core configuration
│   │   ├── config.py     # Pydantic settings
│   │   ├── security.py   # JWT & password hashing
│   │   ├── logging.py    # Structured logging
│   │   ├── middleware.py # Error & logging middleware
│   │   ├── exceptions.py # Custom exceptions
│   │   └── health.py     # Health check utilities
│   ├── db/               # Database
│   │   └── session.py    # SQLAlchemy session
│   ├── models/           # SQLAlchemy models
│   │   └── user.py       # User model with RBAC
│   ├── schemas/          # Pydantic schemas
│   │   ├── token.py      # Token schemas
│   │   └── user.py       # User schemas
│   ├── services/         # Business logic
│   │   ├── auth.py       # Google OAuth service
│   │   └── user.py       # User service
│   └── main.py           # FastAPI application
├── alembic/              # Database migrations
│   ├── versions/         # Migration files
│   └── env.py            # Alembic config
├── .env.example          # Environment variables template
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites
- Python 3.12+
- pip

### Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Run migrations:**
```bash
export PATH="/home/ubuntu/.local/bin:$PATH"  # If using system Python
alembic upgrade head
```

4. **Start server:**
```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database
DATABASE_URL=sqlite:///./be4breach.db
# For PostgreSQL: postgresql://user:password@localhost:5432/be4breach

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Google OAuth2 (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/google/callback

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# Application
ENVIRONMENT=development
PROJECT_NAME=Be4Breach Platform
VERSION=0.1.0
```

## 📡 API Endpoints

### Health
- `GET /health` - Basic health check
- `GET /health?detailed=true` - Health check with system metrics

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login (returns access + refresh tokens)
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `GET /api/v1/users` - List users (admin only)
- `GET /api/v1/users/{id}` - Get user (admin only)
- `PUT /api/v1/users/{id}` - Update user (admin only)
- `DELETE /api/v1/users/{id}` - Delete user (admin only)

### Documentation
- `GET /api/v1/docs` - Swagger UI
- `GET /api/v1/redoc` - ReDoc

## 🔐 Authentication Flow

### Email/Password Authentication

1. **Register:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure_password",
    "full_name": "John Doe"
  }'
```

2. **Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=secure_password"
```

Response:
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

3. **Use access token:**
```bash
curl -X GET http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer eyJhbGc..."
```

4. **Refresh token:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "eyJhbGc..."}'
```

### Google OAuth2 Flow

1. Get authorization URL:
```bash
curl http://localhost:8000/api/v1/auth/google
```

2. User authorizes on Google

3. Callback returns access and refresh tokens

## 👥 Role-Based Access Control

### Roles

- **admin**: Full system access
  - Manage all users
  - Access all endpoints
  
- **client**: Limited access
  - View own profile
  - Update own profile
  
- **user**: Basic access
  - View own profile
  - Update own profile

### Role Enforcement

Roles are enforced at the API level using dependencies:

```python
from app.api.deps import CurrentUser, CurrentSuperUser

@router.get("/users/me")
async def get_me(current_user: CurrentUser):
    # Any authenticated user can access
    pass

@router.get("/admin/users")
async def list_users(admin: CurrentSuperUser):
    # Only admin role can access
    pass
```

## 📝 Structured Logging

All requests and errors are logged in structured format:

```json
{
  "event": "request_completed",
  "method": "POST",
  "path": "/api/v1/auth/login",
  "status_code": 200,
  "process_time": "0.045s",
  "request_id": "140234567890"
}
```

## ⚠️ Error Handling

The backend never crashes. All errors are caught and logged:

### Error Middleware
- Catches all unhandled exceptions
- Logs error details with stack traces
- Returns appropriate HTTP status codes
- Includes request_id for tracing

### Error Response Format
```json
{
  "detail": "Error message",
  "error_type": "validation_error",
  "request_id": "140234567890"
}
```

## 🗄️ Database

### SQLite (Development)
```env
DATABASE_URL=sqlite:///./be4breach.db
```

### PostgreSQL (Production)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/be4breach
```

### Migrations

Create migration:
```bash
alembic revision --autogenerate -m "Description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback:
```bash
alembic downgrade -1
```

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt
2. **JWT Tokens**: HS256 algorithm, expiring tokens
3. **CORS**: Configured origins only
4. **SQL Injection**: Protected via ORM
5. **Input Validation**: Pydantic v2
6. **CSRF Protection**: OAuth2 state parameter
7. **Secure Headers**: Recommended in production

## 🚀 Production Deployment

### Using systemd

Create `/etc/systemd/system/be4breach-api.service`:
```ini
[Unit]
Description=Be4Breach API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/be4breach-platform/backend
Environment="PATH=/usr/local/bin"
ExecStart=/usr/local/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always

[Install]
WantedBy=multi-user.target
```

### Using Docker

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📊 Health Check Response

```bash
curl http://localhost:8000/health?detailed=true
```

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "services": {
    "database": {
      "status": "healthy",
      "latency_ms": 0
    }
  },
  "system": {
    "cpu_percent": 25.3,
    "memory_percent": 45.2,
    "memory_available_mb": 2048,
    "disk_percent": 60.1,
    "disk_free_gb": 50.5
  }
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
pytest

# Check code quality
black app/
ruff app/
mypy app/
```

## 📚 Dependencies

See `requirements.txt` for complete list:

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **sqlalchemy** - ORM
- **alembic** - Migrations
- **pydantic** - Validation
- **python-jose** - JWT
- **passlib** - Password hashing
- **authlib** - OAuth2
- **structlog** - Logging
- **psutil** - System metrics

## 🤝 Development

### Code Style
- Python 3.12+ features
- Type hints everywhere
- Async/await for I/O
- Docstrings for public APIs

### Adding New Endpoints

1. Create route in `app/api/`
2. Add schemas in `app/schemas/`
3. Add service logic in `app/services/`
4. Add tests
5. Update documentation

## 🔍 Troubleshooting

### Backend won't start
```bash
# Check dependencies
pip install -r requirements.txt

# Check database
alembic upgrade head

# Check .env configuration
cat .env
```

### Database errors
```bash
# Reset database (development only)
rm be4breach.db
alembic upgrade head
```

### Token errors
```bash
# Ensure SECRET_KEY is set in .env
# Check token expiration times
# Verify ALGORITHM matches
```

## 📝 License

MIT License

---

**Built for security, scalability, and reliability.**
