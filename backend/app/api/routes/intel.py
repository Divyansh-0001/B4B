from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, require_roles
from app.core.audit import record_audit_event
from app.core.rbac import Role
from app.core.threats import ThreatSeverity
from app.db.models import ThreatSignal, User
from app.db.session import get_session
from app.schemas.intel import IntelSummary, ThreatSignalCreate, ThreatSignalPublic

router = APIRouter(prefix="/intel", tags=["intel"])

SEVERITY_WEIGHTS = {
    ThreatSeverity.LOW: 1,
    ThreatSeverity.MEDIUM: 3,
    ThreatSeverity.HIGH: 6,
    ThreatSeverity.CRITICAL: 10
}


@router.post(
    "/signals",
    response_model=ThreatSignalPublic,
    status_code=status.HTTP_201_CREATED
)
async def create_signal(
    payload: ThreatSignalCreate,
    db: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_roles(Role.OPERATIVE, Role.COMMAND))
) -> ThreatSignal:
    signal = ThreatSignal(
        title=payload.title,
        source=payload.source,
        severity=payload.severity,
        description=payload.description,
        observed_at=payload.observed_at,
        reporter_id=current_user.id
    )
    db.add(signal)
    record_audit_event(
        db,
        actor_id=current_user.id,
        action="create_signal",
        resource="threat_signal",
        detail={"title": payload.title, "severity": payload.severity.value}
    )
    await db.commit()
    await db.refresh(signal)
    return signal


@router.get("/signals", response_model=list[ThreatSignalPublic])
async def list_signals(
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user)
) -> list[ThreatSignal]:
    result = await db.execute(
        select(ThreatSignal).order_by(ThreatSignal.created_at.desc())
    )
    return result.scalars().all()


@router.get("/summary", response_model=IntelSummary)
async def intel_summary(
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user)
) -> IntelSummary:
    result = await db.execute(select(ThreatSignal))
    signals = result.scalars().all()
    total = len(signals)
    by_severity: dict[ThreatSeverity, int] = {
        severity: 0 for severity in ThreatSeverity
    }
    for signal in signals:
        by_severity[signal.severity] += 1

    weighted = sum(
        by_severity[severity] * SEVERITY_WEIGHTS[severity]
        for severity in ThreatSeverity
    )
    risk_index = 0.0
    if total > 0:
        risk_index = round((weighted / (total * 10)) * 100, 2)

    last_signal_at = None
    if signals:
        last_signal_at = max(
            (signal.created_at for signal in signals),
            default=datetime.now(timezone.utc)
        )

    return IntelSummary(
        total_signals=total,
        by_severity=by_severity,
        risk_index=risk_index,
        last_signal_at=last_signal_at
    )
