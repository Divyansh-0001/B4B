export default function BackgroundLayers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-hero-radial opacity-80" />
      <div className="absolute inset-0 bg-nebula opacity-70 mix-blend-screen" />
      <div className="absolute inset-0 bg-grid-glow bg-[size:120px_120px] opacity-15" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-abyss-900 via-abyss-900/70 to-transparent" />
    </div>
  );
}
