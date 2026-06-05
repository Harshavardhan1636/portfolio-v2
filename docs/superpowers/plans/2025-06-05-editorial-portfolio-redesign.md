# Implementation Plan: Editorial Portfolio Redesign

**Spec:** `docs/superpowers/specs/2025-06-05-editorial-portfolio-redesign.md`
**Date:** 2025-06-05

---

## Context

The portfolio currently uses a dark premium aesthetic with glassmorphism, particles, gradient text, custom cursor, and numerous utility components. The user rejected this as looking "AI generated" and wants an editorial/creative redesign: light base (#faf9f6), terracotta accent (#c45d3e), Playfair Display headings, magazine-style asymmetric grids, stripped effects, bold typography, generous whitespace.

---

## Tasks

### Task 1: Install dependencies and set up globals.css

**Install:**
- `@fontsource/playfair-display` — self-hosted Playfair Display
- `@fontsource/inter` — self-hosted Inter

**Uninstall:**
- `lenis` — no longer needed

**Update `postcss.config.mjs`:** No changes needed.

**Update `src/app/globals.css`:** COMPLETE REWRITE.

Remove everything. Replace with:

```css
@import "tailwindcss";
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/700.css";
@import "@fontsource/playfair-display/900.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";

@theme {
  --font-display: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --color-bg: #faf9f6;
  --color-text: #1a1a1a;
  --color-accent: #c45d3e;
  --color-border: #e5e3df;
  --color-muted: #888;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--color-accent);
  color: white;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}
```

Remove: all `.glass`, `.gradient-text`, `.shimmer-text`, grain overlay, custom scrollbar, all dark-mode tokens, all utility animations.

---

### Task 2: Remove unused components and dependencies

**Delete these files:**
- `src/components/ParticleBackground.tsx`
- `src/components/CustomCursor.tsx`
- `src/components/SmoothScroll.tsx`
- `src/components/GlassCard.tsx`
- `src/components/TiltCard.tsx`
- `src/components/GradientText.tsx`
- `src/components/CountUp.tsx`

These are no longer used by any component after the rewrite.

---

### Task 3: Update layout.tsx

**File:** `src/app/layout.tsx`

Remove:
- `import SmoothScroll` and `<SmoothScroll />`
- `import CustomCursor` and `<CustomCursor />`
- `lenis` CSS import if any

Change fonts to Playfair Display + Inter:

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
```

Or rely on the @fontsource imports in globals.css and use `font-body` / `font-display` Tailwind classes.

Keep: metadata, `<html lang="en">`, `<body>` structure.

---

### Task 4: Update page.tsx

**File:** `src/app/page.tsx`

Remove:
- `import ParticleBackground` and `<ParticleBackground />`
- `import CustomCursor` if present
- `import SmoothScroll` if present

Keep: all section component imports and their render order.

---

### Task 5: Rewrite Navigation component

**File:** `src/components/Navigation.tsx`

Replace entirely. New design:

```tsx
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
        <a href="#" className="font-display font-bold text-lg text-text">
          H<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
```

No glassmorphism, no gradient logo, no animated indicator pill.

---

### Task 6: Rewrite Hero component

**File:** `src/components/Hero.tsx`

Replace entirely. New design: massive Playfair name at ~10vw, clip-path reveal animation, subtitle, two text links (no gradient buttons).

Key changes:
- Remove TypingTerminal component (it's defined inline in the current Hero)
- Remove shimmer text, gradient CTAs, particle orbs
- Add clip-path: `inset(0 100% 0 0)` → `inset(0 0% 0 0)` animation
- Parallax via framer-motion `useScroll` + `useTransform`
- Name: `font-display font-black text-[10vw] leading-[0.85] tracking-tighter`
- Subtitle: "AI/ML Engineer — Hyderabad, India"
- Two links: "View projects →" and "Get in touch →"
- Scroll indicator: thin line + "Scroll" text

---

### Task 7: Rewrite About component

**File:** `src/components/About.tsx`

Replace entirely. Remove CountUp, GradientText, glass cards, emoji icons, numbered header.

New design:
- Two-column asymmetric layout (5/7 split or 4/8)
- Bio paragraph with semibold keywords (not gradient)
- Vertical border separator between columns
- Stats: bordered cards, plain numbers (no CountUp animation), no emojis
- Remove "Open to opportunities" badge

---

### Task 8: Rewrite Experience component

**File:** `src/components/Experience.tsx`

Replace entirely. Remove tab layout, glassmorphism, AnimatePresence tab switching, numbered header.

New design:
- Single column, stacked entries
- Each entry: role title (Playfair), company/organization, date, bullet points
- Left accent border on the latest entry
- Generous spacing between entries (py-12 or similar)
- Clean bullet points (no cyan arrows)

---

### Task 9: Rewrite Projects component

**File:** `src/components/Projects.tsx`

Replace entirely. Remove TiltCard, GlassCard, emoji icons, numbered header, "Featured" badges.

New design:
- Magazine grid layout (asymmetric)
- Cards: thin border, bg-card, hover accent on title
- Each card: title (Playfair), description, tech tags (mono text)
- No emoji icons, no featured badges
- Remove the "Other projects" separate section — unified grid

---

### Task 10: Rewrite Skills component

**File:** `src/components/Skills.tsx`

Replace entirely. Remove card grid, gradient borders, emoji icons, GradientText, accent color maps.

New design:
- Flowing typographic layout
- Categories as inline headers (Playfair bold, uppercase, small)
- Skills listed inline with interpunct (·) separators
- Each category on its own "row" with generous vertical spacing
- No cards, no borders, no emojis

---

### Task 11: Rewrite Education component

**File:** `src/components/Education.tsx`

Replace entirely. Remove gradient timeline, alternating entrance, glassmorphism, emoji icons, numbered header.

New design:
- Minimal single column
- Each entry: degree (Playfair bold), field, school, date
- Clean spacing, no timeline dots
- Current entry: simple "(Current)" text marker, no animation

---

### Task 12: Rewrite Hackathons component

**File:** `src/components/Hackathons.tsx`

Replace entirely. Remove glass cards, emoji icons, cert pills, numbered header.

New design:
- Two-column layout: Hackathons left, Certifications right
- Hackathons: clean list, name + detail, no emojis
- Certifications: inline list with interpunct separators or comma-separated
- No cards, no borders on items

---

### Task 13: Rewrite Contact and Footer components

**Files:** `src/components/Contact.tsx`, `src/components/Footer.tsx`

**Contact:** Remove glass cards, gradient CTA, emoji icons, background glows, numbered header.
New design:
- Centered, generous whitespace
- "Let's Connect" heading (Playfair)
- Brief paragraph
- Plain text links: Email, GitHub, LinkedIn, Phone — no cards, no icons, no buttons

**Footer:** Remove glass border, gradient logo, glass link pills.
New design:
- Single line: "© 2025 Harsha Vardhan Dyavanapelli"
- Left-aligned, small text, muted color

---

### Task 14: Final cleanup and build verification

- Delete any remaining unused files (old specs can stay in docs/)
- Run `npm run build` to verify no TypeScript or build errors
- Verify no references to deleted components
- Test all anchor links work
- Verify responsive layout on mobile widths

---

## Execution Strategy

Recommended: **Subagent-Driven** — each task is a self-contained component rewrite that can be executed independently. Tasks 1–4 are foundational (do first). Tasks 5–13 can run in parallel. Task 14 is final verification.

---

## Success Criteria

- [ ] Build passes with zero errors
- [ ] No references to deleted components
- [ ] All 7 utility components removed
- [ ] lenis uninstalled
- [ ] Light base (#faf9f6) throughout
- [ ] Playfair Display on all headings
- [ ] No glassmorphism, no gradients, no particles, no emojis
- [ ] Terracotta accent (#c45d3e) used consistently
- [ ] All sections render correctly
- [ ] Mobile responsive
