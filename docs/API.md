# API Documentation

## Base URL

```
Development: http://localhost:8000
Production: https://api.be4breach.com
```

## API Version

All endpoints are prefixed with `/api/v1`

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User

```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "John Doe",
  "role": "user"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "is_verified": false,
  "oauth_provider": null,
  "oauth_id": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### Login

```http
POST /api/v1/auth/login
```

**Request Body:** `application/x-www-form-urlencoded`
```
username=user@example.com
password=secure_password
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Google OAuth Login

```http
GET /api/v1/auth/google
```

**Response:** `200 OK`
```json
{
  "authorization_url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

#### Google OAuth Callback

```http
GET /api/v1/auth/google/callback?code=<code>&state=<state>
```

**Response:** `302 Redirect`
Redirects to frontend with token: `http://localhost:3000/auth/callback?token=<jwt>`

### Users

#### Get Current User

```http
GET /api/v1/users/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "is_verified": false,
  "oauth_provider": null,
  "oauth_id": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### Update Current User

```http
PUT /api/v1/users/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "Jane Doe",
  "email": "newemail@example.com"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "newemail@example.com",
  "full_name": "Jane Doe",
  "role": "user",
  "is_active": true,
  "is_verified": false,
  "oauth_provider": null,
  "oauth_id": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:01Z"
}
```

#### List Users (Admin Only)

```http
GET /api/v1/users?skip=0&limit=100
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "is_active": true,
    "is_verified": false,
    "oauth_provider": null,
    "oauth_id": null,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get User by ID (Admin Only)

```http
GET /api/v1/users/{user_id}
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "is_active": true,
  "is_verified": false,
  "oauth_provider": null,
  "oauth_id": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### Update User (Admin Only)

```http
PUT /api/v1/users/{user_id}
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "role": "admin",
  "is_active": false
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "admin",
  "is_active": false,
  "is_verified": false,
  "oauth_provider": null,
  "oauth_id": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:01Z"
}
```

#### Delete User (Admin Only)

```http
DELETE /api/v1/users/{user_id}
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `204 No Content`

## Error Responses

### 400 Bad Request

```json
{
  "detail": "Email already registered"
}
```

### 401 Unauthorized

```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden

```json
{
  "detail": "The user doesn't have enough privileges"
}
```

### 404 Not Found

```json
{
  "detail": "User not found"
}
```

### 422 Unprocessable Entity

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production.

## Interactive Documentation

FastAPI provides auto-generated interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
