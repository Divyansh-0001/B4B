"""Custom middleware for error handling and logging."""

import time
import traceback
from typing import Callable
from fastapi import Request, Response, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.exc import SQLAlchemyError

from app.core.logging import get_logger

logger = get_logger(__name__)


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    """Middleware to catch and handle all errors gracefully."""

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Process request and handle any errors."""
        request_id = id(request)
        start_time = time.time()
        
        try:
            # Log incoming request
            logger.info(
                "request_started",
                method=request.method,
                path=request.url.path,
                request_id=request_id,
            )
            
            response = await call_next(request)
            
            # Log successful response
            process_time = time.time() - start_time
            logger.info(
                "request_completed",
                method=request.method,
                path=request.url.path,
                status_code=response.status_code,
                process_time=f"{process_time:.3f}s",
                request_id=request_id,
            )
            
            return response
            
        except SQLAlchemyError as e:
            # Database errors
            process_time = time.time() - start_time
            logger.error(
                "database_error",
                error=str(e),
                error_type=type(e).__name__,
                method=request.method,
                path=request.url.path,
                process_time=f"{process_time:.3f}s",
                request_id=request_id,
                exc_info=True,
            )
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={
                    "detail": "Database error occurred",
                    "error_type": "database_error",
                    "request_id": str(request_id),
                }
            )
            
        except ValueError as e:
            # Validation errors
            process_time = time.time() - start_time
            logger.warning(
                "validation_error",
                error=str(e),
                method=request.method,
                path=request.url.path,
                process_time=f"{process_time:.3f}s",
                request_id=request_id,
            )
            return JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={
                    "detail": str(e),
                    "error_type": "validation_error",
                    "request_id": str(request_id),
                }
            )
            
        except Exception as e:
            # Catch all other errors to prevent crashes
            process_time = time.time() - start_time
            error_trace = traceback.format_exc()
            
            logger.error(
                "unexpected_error",
                error=str(e),
                error_type=type(e).__name__,
                traceback=error_trace,
                method=request.method,
                path=request.url.path,
                process_time=f"{process_time:.3f}s",
                request_id=request_id,
            )
            
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={
                    "detail": "An unexpected error occurred",
                    "error_type": "internal_error",
                    "request_id": str(request_id),
                }
            )


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for structured request/response logging."""

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        """Log request and response details."""
        request_id = id(request)
        
        # Add request ID to context
        logger.bind(request_id=request_id)
        
        # Get client information
        client_host = request.client.host if request.client else "unknown"
        
        # Log request details
        logger.debug(
            "request_details",
            method=request.method,
            path=request.url.path,
            query_params=dict(request.query_params),
            client_host=client_host,
            user_agent=request.headers.get("user-agent"),
            request_id=request_id,
        )
        
        response = await call_next(request)
        
        return response
