# Deployment Guide

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.12+ (for backend)
- PostgreSQL (for production database)
- nginx (for reverse proxy)
- SSL certificate (Let's Encrypt recommended)

## Environment Setup

### Backend Environment Variables

Create `/backend/.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/be4breach

# JWT
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Google OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://api.yourdomain.com/api/v1/auth/google/callback

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Environment
ENVIRONMENT=production
```

### Frontend Environment Variables

Create `/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Database Setup

### PostgreSQL Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE be4breach;
CREATE USER be4breach_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE be4breach TO be4breach_user;
\q
```

### Run Migrations

```bash
cd backend
export PATH="/home/ubuntu/.local/bin:$PATH"
alembic upgrade head
```

## Backend Deployment

### Using systemd

Create `/etc/systemd/system/be4breach-api.service`:

```ini
[Unit]
Description=Be4Breach Platform API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/be4breach-platform/backend
Environment="PATH=/usr/local/bin:/usr/bin:/bin"
ExecStart=/usr/local/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable be4breach-api
sudo systemctl start be4breach-api
sudo systemctl status be4breach-api
```

### Using Docker

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t be4breach-api .
docker run -d -p 8000:8000 --env-file .env be4breach-api
```

## Frontend Deployment

### Build

```bash
cd frontend
npm install
npm run build
```

### Using systemd

Create `/etc/systemd/system/be4breach-web.service`:

```ini
[Unit]
Description=Be4Breach Platform Web
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/be4breach-platform/frontend
Environment="PATH=/usr/local/bin:/usr/bin:/bin"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable be4breach-web
sudo systemctl start be4breach-web
sudo systemctl status be4breach-web
```

### Using Docker

Create `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

Update `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... other config
};
```

Build and run:

```bash
docker build -t be4breach-web .
docker run -d -p 3000:3000 --env-file .env.local be4breach-web
```

## nginx Configuration

Create `/etc/nginx/sites-available/be4breach`:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/be4breach /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

## Docker Compose (Complete Stack)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: be4breach
      POSTGRES_USER: be4breach_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://be4breach_user:secure_password@postgres:5432/be4breach
    depends_on:
      - postgres
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
    depends_on:
      - backend
    ports:
      - "3000:3000"

volumes:
  postgres_data:
```

Run:

```bash
docker-compose up -d
```

## Monitoring

### Health Checks

- Backend: http://api.yourdomain.com/health
- Frontend: http://yourdomain.com

### Logging

```bash
# systemd logs
sudo journalctl -u be4breach-api -f
sudo journalctl -u be4breach-web -f

# Docker logs
docker-compose logs -f
```

## Backup

### Database Backup

```bash
pg_dump -U be4breach_user be4breach > backup_$(date +%Y%m%d).sql
```

### Automated Backups

Create cron job:

```bash
0 2 * * * pg_dump -U be4breach_user be4breach > /backups/be4breach_$(date +\%Y\%m\%d).sql
```

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Use strong database passwords
- [ ] Enable SSL/HTTPS
- [ ] Configure firewall (UFW/iptables)
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Monitor logs
- [ ] Set up backups
- [ ] Configure Google OAuth2 credentials
