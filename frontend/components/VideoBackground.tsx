"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackColor?: string;
}

export function VideoBackground({
  videoSrc,
  fallbackColor = "from-blue-950 via-slate-900 to-black",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(!!videoSrc);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {
        setHasVideo(false);
      });
    }
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {hasVideo && videoSrc ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor}`} />
      )}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
    </div>
  );
}
