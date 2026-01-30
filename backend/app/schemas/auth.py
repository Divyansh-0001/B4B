from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.schemas.user import UserPublic


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class AuthResponse(BaseModel):
    user: UserPublic
    tokens: TokenPair

    model_config = ConfigDict(from_attributes=True)


class GoogleAuthRequest(BaseModel):
    code: str | None = None
    id_token: str | None = Field(default=None, alias="idToken")
    redirect_uri: str | None = None

    @model_validator(mode="after")
    def validate_payload(self) -> "GoogleAuthRequest":
        if not self.code and not self.id_token:
            raise ValueError("Provide code or id_token.")
        return self


class RefreshRequest(BaseModel):
    refresh_token: str
