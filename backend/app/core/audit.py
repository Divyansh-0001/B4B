from __future__ import annotations

from sqlalchemy.orm import Session

from app.db.models import AuditEvent


def record_audit_event(
    db: Session,
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
