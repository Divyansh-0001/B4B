"use client";

import type { CSSProperties } from "react";

const streams = [
  { left: "12%", delay: "0s", duration: "14s", opacity: 0.4 },
  { left: "28%", delay: "1.5s", duration: "11s", opacity: 0.5 },
  { left: "48%", delay: "0.8s", duration: "13s", opacity: 0.35 },
  { left: "64%", delay: "2.2s", duration: "12s", opacity: 0.45 },
  { left: "78%", delay: "1.2s", duration: "10s", opacity: 0.4 },
  { left: "90%", delay: "2.6s", duration: "15s", opacity: 0.3 }
];

export default function DataStream() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {streams.map((stream, index) => (
        <span
          key={`stream-${index}`}
          className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-neon/40 to-transparent animate-pulse"
          style={
            {
              left: stream.left,
              animationDelay: stream.delay,
              animationDuration: stream.duration,
              opacity: stream.opacity
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
