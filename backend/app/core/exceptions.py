"""Custom exceptions for the application."""

from typing import Any, Optional


class BaseAPIException(Exception):
    """Base exception for all API errors."""
    
    def __init__(
        self,
        message: str,
        status_code: int = 500,
        error_code: Optional[str] = None,
        details: Optional[Any] = None
    ):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code or self.__class__.__name__
        self.details = details
        super().__init__(self.message)


class AuthenticationError(BaseAPIException):
    """Authentication failed."""
    
    def __init__(self, message: str = "Authentication failed", **kwargs):
        super().__init__(message, status_code=401, **kwargs)


class AuthorizationError(BaseAPIException):
    """User not authorized for this action."""
    
    def __init__(self, message: str = "Not authorized", **kwargs):
        super().__init__(message, status_code=403, **kwargs)


class NotFoundError(BaseAPIException):
    """Resource not found."""
    
    def __init__(self, message: str = "Resource not found", **kwargs):
        super().__init__(message, status_code=404, **kwargs)


class ValidationError(BaseAPIException):
    """Validation failed."""
    
    def __init__(self, message: str = "Validation error", **kwargs):
        super().__init__(message, status_code=422, **kwargs)


class DatabaseError(BaseAPIException):
    """Database operation failed."""
    
    def __init__(self, message: str = "Database error", **kwargs):
        super().__init__(message, status_code=500, **kwargs)


class ExternalServiceError(BaseAPIException):
    """External service (e.g., Google OAuth) failed."""
    
    def __init__(self, message: str = "External service error", **kwargs):
        super().__init__(message, status_code=502, **kwargs)
