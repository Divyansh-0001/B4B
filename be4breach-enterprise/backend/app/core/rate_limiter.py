from __future__ import annotations

import time
from collections import defaultdict, deque
from dataclasses import dataclass
from typing import Deque, DefaultDict


@dataclass(frozen=True)
class RateLimitRule:
    max_requests: int
    window_seconds: int


class InMemoryRateLimiter:
    def __init__(self) -> None:
        self._requests: DefaultDict[str, Deque[float]] = defaultdict(deque)

    def is_limited(self, key: str, rule: RateLimitRule) -> bool:
        now = time.monotonic()
        window_start = now - rule.window_seconds
        queue = self._requests[key]
        while queue and queue[0] < window_start:
            queue.popleft()

        if len(queue) >= rule.max_requests:
            return True

        queue.append(now)
        return False
