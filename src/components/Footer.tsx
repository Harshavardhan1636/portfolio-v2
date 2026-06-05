"use client";

import GradientText from "./GradientText";

export default function Footer() {
  return (
    <footer className="relative py-12">
      {/* Glass top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-display font-bold text-lg">
            <GradientText>H</GradientText>
            <span className="text-cream">.</span>
            <span className="text-muted text-sm font-mono ml-1">v(ardhan)</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {[
              { label: "GitHub", href: "https://github.com/harshavardhan-dyavanapelli" },
              { label: "LinkedIn", href: "https://linkedin.com/in/harshavardhan-dyavanapelli" },
              { label: "Email", href: "mailto:dpharshavardhan.1636@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-interactive
                className="font-mono text-xs text-muted px-3 py-1.5 glass rounded-lg hover:text-cream hover:border-cyan/20 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Credit */}
          <p className="font-mono text-xs text-muted/50">
            Designed & built by Harsha Vardhan
          </p>
        </div>
      </div>
    </footer>
  );
}
