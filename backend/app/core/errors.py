from __future__ import annotations

from typing import Any, Dict


def error_payload(code: str, message: str, request_id: str | None = None) -> Dict[str, Any]:
    payload: Dict[str, Any] = {"error": {"code": code, "message": message}}
    if request_id:
        payload["error"]["request_id"] = request_id
    return payload
