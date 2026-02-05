import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export function Logo({ className, width = 160, height = 48, showText = true }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/be4breach-logo.svg"
        alt="Be4Breach"
        width={width}
        height={height}
        priority
        className="h-auto w-auto transition-opacity hover:opacity-90"
      />
    </div>
  );
}
