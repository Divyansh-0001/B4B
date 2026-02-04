"""Main FastAPI application."""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import configure_logging, get_logger
from app.core.middleware import ErrorHandlerMiddleware, LoggingMiddleware
from app.core.health import check_database, get_health_response
from app.db.session import init_db, get_db
from app.api import auth, users

# Configure logging first
configure_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    logger.info("application_startup", version=settings.VERSION, environment=settings.ENVIRONMENT)
    try:
        await init_db()
        logger.info("database_initialized")
    except Exception as e:
        logger.error("database_initialization_failed", error=str(e), exc_info=True)
        # Don't crash - continue with degraded functionality
    
    yield
    
    # Shutdown
    logger.info("application_shutdown")


# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)

# Add custom middleware (order matters - last added = first executed)
app.add_middleware(ErrorHandlerMiddleware)  # Catches all errors
app.add_middleware(LoggingMiddleware)       # Logs requests

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])


@app.get("/")
async def root():
    """Root endpoint."""
    logger.info("root_endpoint_accessed")
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "docs": f"{settings.API_V1_STR}/docs"
    }


@app.get("/health")
async def health(
    detailed: bool = Query(False, description="Include detailed system metrics"),
    db: AsyncSession = Depends(get_db)
):
    """
    Health check endpoint.
    
    Returns the health status of the application and its dependencies.
    Use ?detailed=true for system metrics.
    """
    try:
        # Check database
        db_status = await check_database(db)
        
        # Build response
        response = get_health_response(db_status, include_metrics=detailed)
        
        # Log health check
        logger.debug("health_check", status=response["status"], detailed=detailed)
        
        # Return appropriate status code
        status_code = 200 if response["status"] == "healthy" else 503
        
        return JSONResponse(
            status_code=status_code,
            content=response
        )
        
    except Exception as e:
        # Never crash on health check
        logger.error("health_check_failed", error=str(e), exc_info=True)
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "error": "Health check failed"
            }
        )
