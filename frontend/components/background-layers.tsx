export default function BackgroundLayers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-radial opacity-80" />
      <div className="absolute inset-0 bg-nebula opacity-60 mix-blend-screen" />
      <div className="absolute inset-0 grid-overlay animate-gridDrift" />
      <div className="absolute inset-0 noise-layer animate-noiseShift" />
      <div className="absolute inset-x-0 top-0 h-72 ambient-fade" />
    </div>
  );
}
