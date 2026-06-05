"use client";

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "warm";
}

export default function GradientText({
  children,
  className = "",
  variant = "primary",
}: GradientTextProps) {
  return (
    <span className={`${variant === "primary" ? "gradient-text" : "gradient-text-warm"} ${className}`}>
      {children}
    </span>
  );
}
