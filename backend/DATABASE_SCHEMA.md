# Database Schema Documentation

## Overview

Comprehensive database schema with proper normalization, foreign keys, and audit trail support.

## Tables

### 1. users
Main user table with authentication and profile information.

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),  -- NULL for OAuth-only users
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_users_email ON users(email);
CREATE INDEX ix_users_id ON users(id);
```

**Fields:**
- `id`: Primary key
- `email`: Unique email address (indexed)
- `hashed_password`: Bcrypt-hashed password (nullable for OAuth users)
- `full_name`: User's full name
- `is_active`: Account active status
- `is_verified`: Email verification status
- `last_login_at`: Last successful login timestamp
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### 2. roles
Role definitions for RBAC (Role-Based Access Control).

```sql
CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_roles_name ON roles(name);
CREATE INDEX ix_roles_id ON roles(id);
```

**Default Roles:**
- `admin`: Full system access with all permissions
- `client`: Limited access for client users
- `user`: Basic access for regular users

**Fields:**
- `id`: Primary key
- `name`: Unique role name (indexed)
- `description`: Role description
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### 3. user_roles
Junction table for many-to-many relationship between users and roles.

```sql
CREATE TABLE user_roles (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_user_roles_user_id ON user_roles(user_id);
CREATE INDEX ix_user_roles_role_id ON user_roles(role_id);
CREATE INDEX ix_user_roles_id ON user_roles(id);
```

**Fields:**
- `id`: Primary key
- `user_id`: Foreign key to users table
- `role_id`: Foreign key to roles table
- `assigned_at`: When the role was assigned

**Benefits:**
- Users can have multiple roles
- Easy role assignment/revocation
- Audit trail of role changes via assigned_at

### 4. oauth_accounts
OAuth provider account linkage for SSO support.

```sql
CREATE TABLE oauth_accounts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP,
    provider_email VARCHAR(255),
    provider_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_oauth_accounts_user_id ON oauth_accounts(user_id);
CREATE INDEX ix_oauth_accounts_provider ON oauth_accounts(provider);
CREATE INDEX ix_oauth_accounts_provider_user_id ON oauth_accounts(provider_user_id);
CREATE INDEX ix_oauth_accounts_id ON oauth_accounts(id);
```

**Fields:**
- `id`: Primary key
- `user_id`: Foreign key to users table
- `provider`: OAuth provider name (google, github, etc.)
- `provider_user_id`: User ID from OAuth provider
- `access_token`: OAuth access token (encrypted in production)
- `refresh_token`: OAuth refresh token (encrypted in production)
- `token_expires_at`: Token expiration timestamp
- `provider_email`: Email from OAuth provider
- `provider_name`: Name from OAuth provider
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Benefits:**
- Multiple OAuth accounts per user
- Preserve OAuth tokens for API access
- Link multiple providers to same user

### 5. audit_logs
Comprehensive audit trail for all user actions and system events.

```sql
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id INTEGER,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSON,
    status VARCHAR(20) NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX ix_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX ix_audit_logs_action ON audit_logs(action);
CREATE INDEX ix_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX ix_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX ix_audit_logs_id ON audit_logs(id);
```

**Fields:**
- `id`: Primary key
- `user_id`: User who performed action (nullable for system actions)
- `action`: Action type (login, logout, create_user, update_user, etc.)
- `resource_type`: Type of resource affected (user, role, etc.)
- `resource_id`: ID of resource affected
- `ip_address`: Client IP address (IPv6 compatible)
- `user_agent`: Client user agent string
- `details`: Additional context as JSON
- `status`: Result status (success, failure, error)
- `error_message`: Error message if failed
- `created_at`: Timestamp (indexed for queries)

**Logged Actions:**
- `register`: User registration
- `login`: User login (success/failure)
- `logout`: User logout
- `token_refresh`: Token refresh
- `oauth_link`: OAuth account linkage
- `role_assign`: Role assignment
- `role_remove`: Role removal
- `user_update`: User profile update
- `user_delete`: User deletion
- `password_change`: Password change

## Entity Relationships

```
users
  ├── user_roles (1:N)
  │     └── roles (N:1)
  ├── oauth_accounts (1:N)
  └── audit_logs (1:N)
```

## Database Constraints

### Foreign Keys
- `user_roles.user_id` → `users.id` (CASCADE DELETE)
- `user_roles.role_id` → `roles.id` (CASCADE DELETE)
- `oauth_accounts.user_id` → `users.id` (CASCADE DELETE)
- `audit_logs.user_id` → `users.id` (SET NULL on delete)

### Unique Constraints
- `users.email`: Email must be unique
- `roles.name`: Role name must be unique

### Indexes
All tables have primary key indexes, plus:
- Email lookup: `users(email)`
- Role lookup: `roles(name)`
- User roles: `user_roles(user_id, role_id)`
- OAuth lookup: `oauth_accounts(provider, provider_user_id)`
- Audit queries: `audit_logs(user_id, action, created_at)`

## Authentication Flows

### Email/Password Registration
1. User submits email + password
2. Validate password strength
3. Hash password with bcrypt
4. Create `users` record
5. Assign default "user" role via `user_roles`
6. Log registration in `audit_logs`

### Email/Password Login
1. User submits email + password
2. Lookup user by email
3. Verify password hash
4. Update `users.last_login_at`
5. Create JWT tokens
6. Log login in `audit_logs`

### Google OAuth Flow
1. User initiates OAuth
2. Redirect to Google
3. Google redirects back with code
4. Exchange code for tokens
5. Fetch user info from Google
6. Check for existing `oauth_accounts` entry
7. If exists: Login existing user
8. If not: Check `users` by email
   - If exists: Link OAuth account
   - If not: Create new user
9. Create `oauth_accounts` record
10. Assign default role via `user_roles`
11. Update `users.last_login_at`
12. Log OAuth login in `audit_logs`

### Token Refresh
1. Client submits refresh token
2. Validate refresh token
3. Check user still active
4. Generate new access + refresh tokens
5. Log token refresh in `audit_logs`

## Role-Based Access Control (RBAC)

### Role Assignment
```python
# Assign role to user
user_role = UserRole(user_id=1, role_id=2)
db.add(user_role)
```

### Role Check
```python
# Check if user has role
has_admin = await RoleService.user_has_role(db, user_id=1, role_name="admin")
```

### Role Enforcement
```python
# Protect endpoint
@router.get("/admin/users")
async def list_users(admin: CurrentSuperUser):
    # Only accessible to users with admin role
    pass
```

## Security Features

### Input Sanitization
- Email validation and sanitization
- XSS prevention (HTML stripping)
- SQL injection prevention (ORM)
- Null byte removal

### Password Security
- Minimum 8 characters
- Requires: uppercase, lowercase, number, special char
- Bcrypt hashing with salt
- Never stored in plain text

### Rate Limiting
- Registration: 5 per minute per IP
- Login: 10 per minute per IP
- Global: 100 requests per minute per IP

### Audit Logging
- All authentication events logged
- IP address and user agent tracked
- Success and failure events logged
- Searchable by user, action, timestamp

## Queries

### Get User with Roles
```python
user = await db.execute(
    select(User)
    .options(selectinload(User.user_roles).selectinload(UserRole.role))
    .filter(User.id == user_id)
)
```

### Get User's OAuth Accounts
```python
oauth_accounts = await db.execute(
    select(OAuthAccount)
    .filter(OAuthAccount.user_id == user_id)
)
```

### Get Audit Logs for User
```python
logs = await db.execute(
    select(AuditLog)
    .filter(AuditLog.user_id == user_id)
    .order_by(AuditLog.created_at.desc())
    .limit(100)
)
```

### Check Failed Login Attempts
```python
failed_logins = await db.execute(
    select(AuditLog)
    .filter(
        AuditLog.action == "login",
        AuditLog.status == "failure",
        AuditLog.ip_address == ip,
        AuditLog.created_at >= datetime.now() - timedelta(hours=1)
    )
)
```

## Migration

Current migration: `20260204_0824-c77665b21a51_add_comprehensive_database_schema.py`

### Apply Migration
```bash
alembic upgrade head
```

### Rollback
```bash
alembic downgrade -1
```

### Create New Migration
```bash
alembic revision --autogenerate -m "Description"
```

## Production Considerations

### Performance
- Add composite indexes for common queries
- Partition `audit_logs` by date for large datasets
- Archive old audit logs periodically
- Use connection pooling

### Security
- Encrypt OAuth tokens at rest
- Rotate JWT secret keys
- Implement failed login lockout (via audit_logs)
- Use PostgreSQL in production (not SQLite)
- Enable SSL for database connections

### Scalability
- Read replicas for audit log queries
- Cache role checks (Redis)
- Archive audit logs older than 90 days
- Implement soft deletes for users

## Example Data

### Roles Table
```
id | name   | description
---|--------|----------------------------------
1  | admin  | Full system access
2  | client | Limited access for clients
3  | user   | Basic access for regular users
```

### User with Roles
```
users:
id: 1
email: admin@example.com
hashed_password: $2b$12$...

user_roles:
user_id: 1, role_id: 1  (admin role)

oauth_accounts:
user_id: 1
provider: google
provider_user_id: 123456789
```

### Audit Log Entry
```json
{
  "id": 1,
  "user_id": 1,
  "action": "login",
  "status": "success",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "details": {"email": "admin@example.com"},
  "created_at": "2024-01-01T00:00:00Z"
}
```
