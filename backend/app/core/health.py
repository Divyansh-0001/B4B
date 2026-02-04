"""Health check utilities."""

import psutil
from datetime import datetime, timezone
from typing import Dict, Any
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import get_logger

logger = get_logger(__name__)


async def check_database(db: AsyncSession) -> Dict[str, Any]:
    """Check database connectivity and health."""
    try:
        # Execute a simple query
        await db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "latency_ms": 0  # Could measure actual latency
        }
    except Exception as e:
        logger.error("database_health_check_failed", error=str(e))
        return {
            "status": "unhealthy",
            "error": str(e)
        }


def get_system_metrics() -> Dict[str, Any]:
    """Get system resource metrics."""
    try:
        cpu_percent = psutil.cpu_percent(interval=0.1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return {
            "cpu_percent": cpu_percent,
            "memory_percent": memory.percent,
            "memory_available_mb": memory.available / (1024 * 1024),
            "disk_percent": disk.percent,
            "disk_free_gb": disk.free / (1024 * 1024 * 1024)
        }
    except Exception as e:
        logger.error("system_metrics_failed", error=str(e))
        return {
            "error": "Unable to retrieve system metrics"
        }


def get_health_response(
    database_status: Dict[str, Any],
    include_metrics: bool = False
) -> Dict[str, Any]:
    """Build comprehensive health check response."""
    response = {
        "status": "healthy" if database_status["status"] == "healthy" else "degraded",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "services": {
            "database": database_status
        }
    }
    
    if include_metrics:
        response["system"] = get_system_metrics()
    
    return response
