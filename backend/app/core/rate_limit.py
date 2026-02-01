from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Dict, Tuple


@dataclass
class RateLimitResult:
    allowed: bool
    remaining: int
    reset_in_seconds: int


class RateLimiter:
    def __init__(self, limit_per_minute: int) -> None:
        self.limit = max(1, limit_per_minute)
        self.storage: Dict[str, Tuple[int, float]] = {}

    def check(self, key: str) -> RateLimitResult:
        now = time.time()
        window = 60.0
        count, start = self.storage.get(key, (0, now))

        if now - start >= window:
            count, start = 0, now

        count += 1
        self.storage[key] = (count, start)

        remaining = max(0, self.limit - count)
        reset_in = int(max(0, window - (now - start)))
        return RateLimitResult(count <= self.limit, remaining, reset_in)
