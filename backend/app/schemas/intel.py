from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.core.threats import ThreatSeverity


class ThreatSignalCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    source: str = Field(min_length=2, max_length=255)
    severity: ThreatSeverity = ThreatSeverity.MEDIUM
    description: str | None = None
    observed_at: datetime | None = None


class ThreatSignalPublic(BaseModel):
    id: str
    title: str
    source: str
    severity: ThreatSeverity
    description: str | None = None
    observed_at: datetime | None = None
    created_at: datetime
    reporter_id: str

    model_config = ConfigDict(from_attributes=True)


class IntelSummary(BaseModel):
    total_signals: int
    by_severity: dict[ThreatSeverity, int]
    risk_index: float
    last_signal_at: datetime | None = None
