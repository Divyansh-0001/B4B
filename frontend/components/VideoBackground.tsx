"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackColor?: string;
  redOverlay?: boolean;
}

export function VideoBackground({
  videoSrc = "/videos/cybersecurity-bg.mp4",
  fallbackColor = "from-neutral-900 via-neutral-950 to-black",
  redOverlay = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(!!videoSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      // Try to play video
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoaded(true);
          })
          .catch((error) => {
            console.warn("Video autoplay failed:", error);
            setHasVideo(false);
          });
      }
    }
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {hasVideo && videoSrc ? (
        <>
          {/* Video element with GPU optimization */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover will-change-auto"
            style={{
              transform: "translateZ(0)", // Force GPU acceleration
              backfaceVisibility: "hidden",
            }}
            onError={() => setHasVideo(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
          </video>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* RED overlay gradient */}
          {redOverlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          )}
          
          {/* RED vignette */}
          {redOverlay && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(225,6,0,0.1)_100%)]" />
          )}
        </>
      ) : (
        <>
          {/* Fallback gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor}`} />
          
          {/* RED accent overlay */}
          {redOverlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          )}
        </>
      )}
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Animated scanline effect (cybersecurity aesthetic) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(0deg, transparent 0%, rgba(225,6,0,0.1) 50%, transparent 100%)",
          animation: "scanline 8s linear infinite",
        }}
      />
      
      {/* CSS for scanline animation */}
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes scanline {
            0%, 100% {
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
}
