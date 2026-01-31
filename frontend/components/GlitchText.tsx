"use client";

type GlitchTextProps = {
  text: string;
  className?: string;
};

export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={className}>{text}</span>
  );
}
