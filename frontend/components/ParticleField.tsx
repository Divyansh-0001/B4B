"use client";

import type { CSSProperties } from "react";

const particles = [
  { top: "12%", left: "18%", size: 2, delay: "0s", duration: "10s" },
  { top: "22%", left: "72%", size: 3, delay: "1s", duration: "12s" },
  { top: "38%", left: "42%", size: 2, delay: "2s", duration: "9s" },
  { top: "46%", left: "15%", size: 1.5, delay: "0.5s", duration: "11s" },
  { top: "58%", left: "28%", size: 2.5, delay: "1.8s", duration: "13s" },
  { top: "64%", left: "82%", size: 2, delay: "2.4s", duration: "10s" },
  { top: "72%", left: "55%", size: 1.8, delay: "1.2s", duration: "9.5s" },
  { top: "18%", left: "88%", size: 2.2, delay: "0.8s", duration: "12s" },
  { top: "32%", left: "8%", size: 2.4, delay: "2.6s", duration: "10.5s" },
  { top: "82%", left: "35%", size: 2.1, delay: "1.6s", duration: "11.5s" },
  { top: "76%", left: "12%", size: 1.7, delay: "0.4s", duration: "9s" },
  { top: "14%", left: "55%", size: 2.8, delay: "1.1s", duration: "13s" },
  { top: "44%", left: "90%", size: 1.6, delay: "2.9s", duration: "10s" },
  { top: "52%", left: "66%", size: 2.3, delay: "1.3s", duration: "12s" },
  { top: "68%", left: "4%", size: 2.1, delay: "0.7s", duration: "10s" },
  { top: "86%", left: "72%", size: 1.9, delay: "2.1s", duration: "11s" }
];

export default function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className="particle"
          style={
            {
              top: particle.top,
              left: particle.left,
              width: `${particle.size}rem`,
              height: `${particle.size}rem`,
              "--particle-delay": particle.delay,
              "--particle-duration": particle.duration,
              "--particle-opacity": 0.35
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
