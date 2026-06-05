"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bg/95 backdrop-blur-md border-b border-border" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        <a href="#" data-interactive className="font-display font-bold text-base text-text">
          Harsha Vardhan<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-interactive
              className="link-underline text-sm text-muted"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
