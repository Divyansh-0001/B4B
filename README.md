# Be4Breach Platform

A production-ready monorepo for a modern security platform with role-based access control, JWT authentication, and Google OAuth2 SSO.

## 🚀 Features

### Frontend
- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 🎭 **shadcn/ui** components (built on Radix UI)
- ✨ **Framer Motion** for smooth animations
- 🎬 **Video Background** support
- 📱 **Responsive Design**
- 🔷 **TypeScript** for type safety

### Backend
- 🚀 **FastAPI** - High-performance Python web framework
- 🐍 **Python 3.12**
- 🗄️ **SQLAlchemy 2.0** - Modern async ORM
- 🔄 **Alembic** - Database migrations
- ✅ **Pydantic v2** - Data validation
- 🔐 **JWT Authentication**
- 🔑 **Google OAuth2 SSO**
- 👥 **Role-Based Access Control (RBAC)**
  - Admin - Full system access
  - Client - Limited access
  - User - Basic access

## 📁 Project Structure

```
be4breach-platform/
├── frontend/              # Next.js frontend
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utilities
│   └── public/          # Static assets
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── core/        # Configuration
│   │   ├── db/          # Database setup
│   │   ├── models/      # SQLAlchemy models
│   │   ├── schemas/     # Pydantic schemas
│   │   └── services/    # Business logic
│   └── alembic/         # Database migrations
├── shared/               # Shared types & constants
│   ├── types/           # TypeScript types
│   └── constants/       # Shared constants
└── docs/                # Documentation
    ├── ARCHITECTURE.md  # System architecture
    ├── API.md          # API documentation
    └── DEPLOYMENT.md   # Deployment guide
```

## 🛠️ Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.12+
- **pip** (Python package manager)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd be4breach-platform
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### 3. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
export PATH="/home/ubuntu/.local/bin:$PATH"
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

The backend will be available at [http://localhost:8000](http://localhost:8000)

API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Database (SQLite for development, PostgreSQL for production)
DATABASE_URL=sqlite:///./be4breach.db

# JWT Configuration
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Google OAuth2 (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/v1/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Environment
ENVIRONMENT=development
```

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions

## 🔐 Authentication

### Email/Password

1. Register: `POST /api/v1/auth/register`
2. Login: `POST /api/v1/auth/login`
3. Use returned JWT token in Authorization header

### Google OAuth2

1. Get authorization URL: `GET /api/v1/auth/google`
2. User authorizes on Google
3. Callback: `GET /api/v1/auth/google/callback`
4. Redirected to frontend with JWT token

## 👥 User Roles

- **Admin**: Full access to all endpoints, can manage users
- **Client**: Limited access (customizable)
- **User**: Basic access

## 🧪 Testing

### Frontend

```bash
cd frontend
npm run build  # Test production build
npm run lint   # Run linter
```

### Backend

```bash
cd backend
python -m pytest  # Run tests (when added)
```

## 📦 Building for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🗄️ Database Migrations

### Create a new migration

```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

### Apply migrations

```bash
alembic upgrade head
```

### Rollback migration

```bash
alembic downgrade -1
```

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/google/callback` - OAuth callback

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update current user
- `GET /api/v1/users` - List users (admin)
- `GET /api/v1/users/{id}` - Get user (admin)
- `PUT /api/v1/users/{id}` - Update user (admin)
- `DELETE /api/v1/users/{id}` - Delete user (admin)

## 🎨 UI Components

The frontend uses shadcn/ui components:

- Button
- Card
- Input
- Form
- Dialog
- And more...

Custom components:
- VideoBackground - Supports video backgrounds with fallback
- Hero - Animated landing section

## 🌐 CORS Configuration

CORS is configured to allow requests from:
- `http://localhost:3000` (development)
- Add production domains in `backend/app/core/config.py`

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🔒 Security

- All passwords are hashed with bcrypt
- JWT tokens for stateless authentication
- CORS protection
- SQL injection protection via ORM
- Input validation with Pydantic
- OAuth2 CSRF protection

## 🚀 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed production deployment instructions.

Quick deployment options:
- Docker & Docker Compose
- systemd services
- Vercel (frontend)
- Railway/Render/AWS (backend)

## ⚡ Performance

- Async/await for database operations
- Connection pooling
- SSR and SSG with Next.js
- Optimized images and assets
- CDN-friendly static files

## 📊 Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript 5.7
- Tailwind CSS 3.4
- Framer Motion 11
- shadcn/ui
- lucide-react

### Backend
- Python 3.12
- FastAPI 0.115
- SQLAlchemy 2.0
- Alembic 1.14
- Pydantic 2.10
- python-jose (JWT)
- authlib (OAuth2)

### Database
- SQLite (development)
- PostgreSQL (production)

---

**Built with ❤️ for secure, scalable applications**
