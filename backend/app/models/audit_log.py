"""Audit log model for tracking user actions."""

from datetime import datetime, timezone
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, Dict, Any

from app.db.session import Base


class AuditLog(Base):
    """Audit log for tracking user actions and system events."""

    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    
    # User who performed the action (nullable for system actions)
    user_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    
    # Action details
    action: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # login, logout, create_user, etc.
    resource_type: Mapped[str] = mapped_column(String(100), nullable=True, index=True)  # user, role, etc.
    resource_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    
    # Request details
    ip_address: Mapped[str] = mapped_column(String(45), nullable=True)  # IPv6 compatible
    user_agent: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Additional context
    details: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    
    # Result
    status: Mapped[str] = mapped_column(String(20), nullable=False)  # success, failure, error
    error_message: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True
    )

    # Relationships
    user: Mapped[Optional["User"]] = relationship("User", back_populates="audit_logs")

    def __repr__(self) -> str:
        return f"<AuditLog {self.action} by user_id={self.user_id}>"
