"use client";

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-noir-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-display font-bold text-lg">
            <span className="text-cyan">H</span>
            <span className="text-cream">.</span>
            <span className="text-muted text-sm font-mono ml-1">v(ardhan)</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 font-mono text-xs text-muted">
            <a
              href="https://github.com/harshavardhan-dyavanapelli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/harshavardhan-dyavanapelli"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:dpharshavardhan.1636@gmail.com"
              className="hover:text-cream transition-colors duration-300"
            >
              Email
            </a>
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
