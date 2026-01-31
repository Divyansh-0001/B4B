"use client";

import dynamic from "next/dynamic";

import AnimatedGrid from "./AnimatedGrid";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });
const DataStream = dynamic(() => import("./DataStream"), { ssr: false });

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
