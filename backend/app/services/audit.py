"""Audit logging service."""

from typing import Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Request

from app.models.audit_log import AuditLog
from app.core.logging import get_logger

logger = get_logger(__name__)


class AuditService:
    """Service for creating audit log entries."""

    @staticmethod
    async def log_action(
        db: AsyncSession,
        action: str,
        status: str,
        user_id: Optional[int] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[int] = None,
        details: Optional[Dict[str, Any]] = None,
        error_message: Optional[str] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
    ) -> AuditLog:
        """
        Create an audit log entry.
        
        Args:
            db: Database session
            action: Action performed (e.g., "login", "create_user")
            status: Result status ("success", "failure", "error")
            user_id: User who performed the action
            resource_type: Type of resource affected
            resource_id: ID of resource affected
            details: Additional context
            error_message: Error message if status is failure/error
            ip_address: Client IP address
            user_agent: Client user agent
            
        Returns:
            Created audit log entry
        """
        try:
            audit_log = AuditLog(
                user_id=user_id,
                action=action,
                resource_type=resource_type,
                resource_id=resource_id,
                details=details,
                status=status,
                error_message=error_message,
                ip_address=ip_address,
                user_agent=user_agent,
            )
            
            db.add(audit_log)
            await db.flush()
            
            logger.info(
                "audit_log_created",
                action=action,
                status=status,
                user_id=user_id,
                resource_type=resource_type,
            )
            
            return audit_log
            
        except Exception as e:
            logger.error(
                "audit_log_creation_failed",
                action=action,
                error=str(e),
                exc_info=True
            )
            # Don't raise - audit logging should not break the main flow
            return None

    @staticmethod
    def get_request_info(request: Request) -> tuple[str, str]:
        """
        Extract IP address and user agent from request.
        
        Args:
            request: FastAPI request object
            
        Returns:
            Tuple of (ip_address, user_agent)
        """
        # Get IP address (handle proxies)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            ip_address = forwarded.split(",")[0].strip()
        elif request.client:
            ip_address = request.client.host
        else:
            ip_address = "unknown"
        
        # Get user agent
        user_agent = request.headers.get("User-Agent", "unknown")
        
        return ip_address, user_agent
