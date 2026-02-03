# API Documentation

## Base URL

- Development: `http://localhost:8000`
- Production: TBD

## API Version

Current version: `v1`

All endpoints are prefixed with `/api/v1`

## Interactive Documentation

When running in development mode:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Authentication

### JWT Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

#### GET /api/v1/health

Check API health status.

**Response**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Root

#### GET /

API root endpoint.

**Response**
```json
{
  "message": "Be4Breach Platform API",
  "version": "1.0.0",
  "status": "running"
}
```

## Error Responses

### Standard Error Format

```json
{
  "detail": "Error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

Rate limiting will be implemented in future versions.

## Versioning

API versioning is handled via URL path (`/api/v1`, `/api/v2`, etc.)
