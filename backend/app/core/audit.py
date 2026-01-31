from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import AuditEvent


def record_audit_event(
    db: AsyncSession,
    actor_id: str,
    action: str,
    resource: str,
    detail: dict | None = None
) -> None:
    event = AuditEvent(
        actor_id=actor_id,
        action=action,
        resource=resource,
        detail=detail
    )
    db.add(event)
