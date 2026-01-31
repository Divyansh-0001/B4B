"use client";

import AnimatedGrid from "./AnimatedGrid";
import DataStream from "./DataStream";
import ParticleField from "./ParticleField";

export default function BackgroundScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatedGrid />
      <ParticleField />
      <DataStream />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-abyss/80" />
    </div>
  );
}
