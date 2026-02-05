"""OAuth account model."""

from datetime import datetime, timezone
from sqlalchemy import String, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class OAuthAccount(Base):
    """OAuth account for external authentication providers."""

    __tablename__ = "oauth_accounts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    
    # OAuth provider info
    provider: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # google, github, etc.
    provider_user_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    
    # OAuth tokens (encrypted in production)
    access_token: Mapped[str] = mapped_column(Text, nullable=True)
    refresh_token: Mapped[str] = mapped_column(Text, nullable=True)
    token_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    
    # Profile info
    provider_email: Mapped[str] = mapped_column(String(255), nullable=True)
    provider_name: Mapped[str] = mapped_column(String(255), nullable=True)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="oauth_accounts")

    def __repr__(self) -> str:
        return f"<OAuthAccount {self.provider}:{self.provider_user_id}>"
