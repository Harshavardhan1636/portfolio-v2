# Editorial Portfolio Redesign — Design Spec

**Date:** 2025-06-05
**Project:** D:\harsha-portfolio (Next.js 16, Tailwind v4, Framer Motion)
**Approach:** Full restructure — strip all effects, rebuild as editorial/creative portfolio

---

## Goal

Transform the current AI-generated-looking portfolio into a professionally designed editorial portfolio with magazine-style layouts, bold typography, and intentional whitespace. Remove ALL decorative effects (particles, glassmorphism, custom cursor, gradient text).

---

## Design System

### Color Palette

| Token | Hex | Purpose |
|-------|-----|---------|
| `bg` | `#faf9f6` | Main background — warm off-white |
| `bg-alt` | `#f0eeea` | Alternate section backgrounds |
| `text` | `#1a1a1a` | Primary text — near-black |
| `text-secondary` | `#6b6b6b` | Secondary text — warm gray |
| `accent` | `#c45d3e` | Single accent — muted terracotta |
| `accent-hover` | `#a84d32` | Accent hover state |
| `border` | `#e5e3df` | Subtle borders |

### Typography

- **Display:** Playfair Display (serif) — headings, hero name. Weights: 400, 700, 900
- **Body:** Inter (sans) — body text, navigation, labels. Weights: 300, 400, 500, 600
- **Mono:** JetBrains Mono — code elements only (tags)

### Effects to REMOVE

- `ParticleBackground.tsx` — delete
- `CustomCursor.tsx` — delete
- `SmoothScroll.tsx` — delete
- `GlassCard.tsx` — delete
- `TiltCard.tsx` — delete
- `GradientText.tsx` — delete
- `CountUp.tsx` — delete
- All `.glass`, `.glass-hover`, `.gradient-text`, `.gradient-text-warm`, `.shimmer-text` CSS classes — remove
- Grain overlay (`body::before`) — remove
- Custom scrollbar — remove (use browser default)
- Custom cursor — remove
- Lenis dependency — uninstall
- Glowing orbs in Hero — remove
- `data-interactive` attributes — remove

### Effects to KEEP

- Framer Motion `whileInView` for scroll-triggered reveals (fade + slide up, once)
- Native `scroll-behavior: smooth` for anchor links
- Subtle hover transitions on links and cards (color shifts, border changes)

---

## Navigation

**Type:** Minimal top nav, transparent → solid on scroll

**Design:**
- Logo: "HV" in Playfair Display, bold, text color
- Links: About, Experience, Projects, Skills, Education, Contact — in Inter, 14px, secondary color, uppercase tracking-wide
- Active link: accent color
- On scroll (50px+): background becomes `bg` with subtle bottom border
- Mobile: hamburger menu with full-screen overlay

**No:** Glassmorphism, gradient logo, animated indicators, numbered prefixes

---

## Hero

**Layout:** Full viewport height, left-aligned content

**Design:**
- Name fills the screen in Playfair Display, weight 900
  - "Harsha" — `text` color, ~10vw
  - "Vardhan" — `text` color at 40% opacity, ~10vw
  - "Dyavanapelli" — `accent` color, ~10vw
- Below: subtitle in Inter, 18px, secondary color — "AI/ML Engineer · Hyderabad, India"
- Below: two text links — "View Work →" and "Get in Touch →" — in Inter, accent color on hover, with arrow that slides on hover

**Interaction:**
- On load: clip-path reveal animation — each word slides up from below a mask, staggered
- On scroll: subtle parallax on the name (moves slower than page)

**Remove:** Terminal card, particles, grid background, gradient CTAs, shimmer text, scroll indicator, glowing orbs

---

## About

**Layout:** 2-column asymmetric (7/12 + 5/12) with thin vertical separator

**Design:**
- Left: One strong bio paragraph in Inter, 18px, line-height 1.8
- Right: 4 stat cards — simple bordered rectangles with generous padding
  - Large number in Playfair, 48px, accent color
  - Small label in Inter, 12px, uppercase, secondary color
  - Stats: "4+ Internships", "6+ Projects", "4 Hackathons", "10+ Certifications"
- Vertical separator: 1px border line between columns

**Interaction:**
- Text fades in from left, stats from right, staggered

**Remove:** Emoji icons, "Open to opportunities" badge, CountUp animation, gradient headers, numbered section prefix

---

## Experience

**Layout:** Single column, generous vertical spacing between entries

**Design:**
- Section heading: "Experience" in Playfair, 48px, left-aligned
- Each entry:
  - Company name in Inter, bold, 20px
  - Role in Playfair, italic, 16px
  - Period in JetBrains Mono, 13px, secondary color
  - Bullet points with simple dash markers (—), Inter, 16px, secondary color
- Entries separated by 1px horizontal border line
- Most recent entry: 3px accent-colored left border
- Spacing: 64px+ between entries

**Interaction:**
- Each entry fades in + slides up on scroll, staggered

**Remove:** Tab layout, glassmorphism, AnimatePresence transitions, gradient section number, period badges

---

## Projects

**Layout:** Asymmetric magazine grid

**Design:**
- Section heading: "Selected Work" in Playfair, 48px
- Featured projects (2): Full-width cards
  - Title in Playfair, bold, 28px
  - Description in Inter, 16px, secondary color
  - Tags as simple text pills: `border border-border text-secondary font-mono text-xs px-2 py-1`
  - Card: subtle border, generous padding (32px), bg-alt background
  - Hover: border transitions to accent, title color shifts to accent
- Regular projects (3): 2-column grid, smaller cards
  - Same structure but more compact

**Interaction:**
- Cards stagger in on scroll
- Hover: border + title color change

**Remove:** TiltCard, GlassCard, emoji icons, featured badges, gradient text

---

## Skills

**Layout:** Flowing typographic layout — not a grid of cards

**Design:**
- Section heading: "Capabilities" in Playfair, 48px
- Skills in a flowing paragraph layout:
  - Category names in Playfair, bold italic, 16px — inline as headers
  - Skills in Inter, 15px, secondary color — separated by interpunct (·)
  - Example: "**Languages** — Python · Java · C · **AI / ML** — Machine Learning · Deep Learning · Computer Vision · NLP · LLM Fundamentals · Model Training & Evaluation"
- Generous line-height (2.0) for readability

**Interaction:**
- Whole block fades in on scroll
- Individual skill words: subtle accent color on hover

**Remove:** Card grid, emoji icons, gradient borders, staggered tag animations, accent color maps

---

## Education

**Layout:** Single column, minimal

**Design:**
- Section heading: "Education" in Playfair, 48px
- Two entries:
  - Degree in Playfair, bold, 20px
  - Field in Inter, 16px
  - School name in Inter, secondary color
  - Location + period in Inter, 13px, secondary color
- Current entry: small "Current" tag in accent color
- Separated by thin horizontal line

**Interaction:**
- Fade in on scroll

**Remove:** Timeline line, dots, gradient timeline, alternating entrance, glassmorphism cards

---

## Hackathons & Certifications

**Layout:** 2-column

**Design:**
- Section heading: "Competitions & Certifications" in Playfair, 48px
- Left column: Hackathon entries with name (Inter bold) and detail (Inter, secondary), separated by thin lines
- Right column: Certifications as a simple list, each on its own line, separated by thin lines

**Interaction:**
- Columns fade in from left and right

**Remove:** Emoji icons, glassmorphism cards, cert pills, gradient section number

---

## Contact & Footer

**Contact:**
- Section heading: "Let's Work Together" in Playfair, 48px, centered
- Brief paragraph in Inter, centered
- Contact links as large styled text (20px): Email, LinkedIn, GitHub, Phone — each on its own line, centered, accent color on hover
- No cards, no icons, no CTA button

**Footer:**
- Single line: "© 2025 Harsha Vardhan" in Inter, 13px, secondary color, centered
- Thin top border

**Remove:** Glass cards, gradient CTA, glow effects, emoji icons, social link pills

---

## Implementation Order

1. Design system overhaul (globals.css) — new colors, typography, remove all old utilities
2. Remove unused components and dependencies (particles, cursor, glass cards, etc.)
3. Update layout.tsx — new fonts, remove SmoothScroll/CustomCursor wrappers
4. Update page.tsx — remove ParticleBackground
5. Rewrite Navigation
6. Rewrite Hero
7. Rewrite About
8. Rewrite Experience
9. Rewrite Projects
10. Rewrite Skills
11. Rewrite Education
12. Rewrite Hackathons
13. Rewrite Contact + Footer
14. Final cleanup and build verification

---

## Success Criteria

- [ ] No particles, custom cursor, glassmorphism, or gradient text anywhere
- [ ] Light warm off-white background
- [ ] Single terracotta accent color
- [ ] Playfair Display for headings, Inter for body
- [ ] Asymmetric magazine-style grid layouts
- [ ] Hero has clip-path reveal animation on name
- [ ] All sections have scroll-triggered fade-in reveals
- [ ] Professional editorial feel — reads as "designer built this"
- [ ] Mobile responsive
- [ ] Clean build with no errors
