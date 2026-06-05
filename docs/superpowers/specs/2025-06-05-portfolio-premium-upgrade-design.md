# Portfolio Premium Upgrade — Design Spec

**Date:** 2025-06-05
**Project:** D:\harsha-portfolio (Next.js 16, Tailwind v4, Framer Motion)
**Approach:** Incremental enhancement — upgrade existing components layer by layer

---

## Goal

Transform the existing dark noir portfolio into a premium, modern experience with glassmorphism, particle effects, 3D interactions, advanced animations, and an interactive terminal — while keeping the same Next.js project structure and section order.

---

## Design System

### Color Palette

| Token | Hex | Purpose |
|-------|-----|---------|
| `noir` | `#06060a` | Deeper body background |
| `noir-light` | `#0d0d14` | Terminal header, subtle surfaces |
| `noir-card` | `#12121a` | Card backgrounds (non-glass) |
| `noir-glass` | `rgba(15, 15, 26, 0.5)` | Glassmorphism card backgrounds |
| `noir-glass-border` | `rgba(255, 255, 255, 0.04)` | Glass border |
| `noir-border` | `#1a1a24` | Solid borders |
| `cyan` | `#00e5ff` | Primary accent |
| `cyan-dim` | `rgba(0, 229, 255, 0.2)` | Subtle cyan |
| `cyan-glow` | `rgba(0, 229, 255, 0.12)` | Glow effects |
| `violet` | `#8b5cf6` | Tertiary accent (new) |
| `violet-dim` | `rgba(139, 92, 246, 0.2)` | Subtle violet |
| `amber` | `#ffab40` | Secondary accent |
| `amber-dim` | `rgba(255, 171, 64, 0.2)` | Subtle amber |
| `cream` | `#e8e6e1` | Primary text |
| `muted` | `#6b6b76` | Secondary text |
| `muted-light` | `#9494a0` | Body text |

### Glassmorphism System

```css
.glass {
  background: rgba(15, 15, 26, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
}

.glass:hover {
  border-color: rgba(0, 229, 255, 0.15);
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.05);
}
```

### Typography

- **Display:** Syne (400-800) — headings, hero name
- **Body:** DM Sans (300-700) — paragraphs, descriptions
- **Mono:** JetBrains Mono (400-700) — labels, code elements, nav

### Gradient System

- **Primary gradient:** `linear-gradient(135deg, #00e5ff, #8b5cf6)` — CTAs, accent lines
- **Warm gradient:** `linear-gradient(135deg, #00e5ff, #ffab40)` — timeline, secondary elements
- **Section numbers:** Gradient text using primary gradient

---

## Architecture & New Dependencies

### New Packages

| Package | Purpose | Size |
|---------|---------|------|
| `tsparticles` + `@tsparticles/react` | Particle starfield background | ~50kb gzipped |
| `lenis` | Smooth scroll library | ~5kb gzipped |
| `@react-three/fiber` + `three` | 3D tilt effect on cards | ~150kb gzipped (lazy loaded) |

**Note:** Three.js is used ONLY for the card tilt effect, not a full 3D scene. Consider using a lighter CSS-only perspective tilt if bundle size is a concern.

### New Components

| Component | Purpose |
|-----------|---------|
| `ParticleBackground.tsx` | Canvas-based starfield with connected dots |
| `CustomCursor.tsx` | Dot + ring cursor that reacts to interactive elements |
| `SmoothScroll.tsx` | Lenis wrapper for the app |
| `TiltCard.tsx` | Card wrapper with 3D perspective tilt on hover |
| `GradientText.tsx` | Reusable gradient text component |
| `GlassCard.tsx` | Reusable glassmorphism card component |
| `CountUp.tsx` | Number counting animation component |

### Component Architecture

```
src/
  app/
    layout.tsx          -- Add SmoothScroll wrapper, CustomCursor
    page.tsx            -- Add ParticleBackground
    globals.css         -- Overhauled design tokens, glass utilities
  components/
    ParticleBackground.tsx  -- NEW
    CustomCursor.tsx        -- NEW
    SmoothScroll.tsx        -- NEW
    TiltCard.tsx            -- NEW
    GradientText.tsx        -- NEW
    GlassCard.tsx           -- NEW
    CountUp.tsx             -- NEW
    Navigation.tsx          -- UPGRADE: glassmorphism, gradient logo
    Hero.tsx                -- UPGRADE: typing terminal, gradient CTAs, parallax
    About.tsx               -- UPGRADE: glass stats, count-up, text reveals
    Experience.tsx          -- UPGRADE: glass tabs, animated transitions
    Projects.tsx            -- UPGRADE: tilt cards, glassmorphism, stagger
    Skills.tsx              -- UPGRADE: gradient borders, staggered tags
    Education.tsx           -- UPGRADE: gradient timeline, alternating cards
    Hackathons.tsx          -- UPGRADE: glass cards, glow effects
    Contact.tsx             -- UPGRADE: gradient text, glowing cards
    Footer.tsx              -- UPGRADE: glass border, gradient logo
```

---

## Section-by-Section Design

### 1. Navigation

- Frosted glass: `backdrop-blur-2xl bg-noir/70`
- Logo: "H." in gradient text (cyan → violet), ".v(ardhan)" in mono
- Active nav item: gradient underline instead of flat cyan
- Mobile menu: glassmorphism overlay with staggered link animations
- Scroll detection: same threshold (50px), transition to glass on scroll

### 2. Hero

- **Background:** Particle starfield (canvas) — cyan and violet dots, faint connecting lines, slow drift. ~80 particles on desktop, ~25 on mobile.
- **Name:** "Harsha" at 40% opacity, "Vardhan" layered, "Dyavanapelli" in gradient text (cyan → violet). Add a periodic gradient shimmer sweep animation.
- **Terminal card:** Glassmorphism panel. macOS traffic lights. JSON fields type in sequentially with a blinking cursor, then loop every 8 seconds. Fields: name, role, location, focus[], status.
- **CTAs:** "View Projects" — gradient background (cyan → violet), hover scale 1.05 + glow shadow. "Get In Touch" — glassmorphism outline, hover fills with gradient.
- **Scroll indicator:** Animated mouse icon with bouncing dot.
- **Parallax:** Hero content translates Y at 0.3x scroll speed.

### 3. About

- **Bio text:** Three paragraphs with scroll-triggered fade-in + slide-up, staggered by 200ms.
- **Stats grid:** 2x2 glassmorphism cards. Each stat has an emoji icon on top, a counting number animation (0 → target), and a label. Count triggers on scroll into view.
- **"Open to opportunities":** Glassmorphism pill with pulsing green dot and subtle green glow.
- **Section header:** "01." in gradient text.

### 4. Experience

- **Tab buttons:** Glassmorphism pills. Active tab: gradient border (cyan → violet) + glow shadow. Inactive: subtle glass.
- **Detail panel:** Glassmorphism card with AnimatePresence for smooth content transitions.
- **Bullet points:** Staggered fade-in + slide-up when tab loads. Arrow markers in cyan with subtle glow.
- **Period badges:** Monospace glassmorphism pills.

### 5. Projects

- **Featured cards:** Glassmorphism with 3D tilt effect (follows mouse cursor, max ±8° rotation). Gradient border that animates on hover. "Featured" badge in gradient. Emoji icon with glow backdrop.
- **Regular cards:** Glassmorphism with hover lift + border brighten.
- **Tag pills:** Glassmorphism monospace pills with hover glow.
- **Layout:** Cards stagger in from bottom on scroll. Featured cards scale from 0.95 → 1.
- **Link arrows:** Subtle arrow icon slides in on hover.

### 6. Skills

- **Category cards:** Glassmorphism panels with gradient top-border line (cyan, amber, or violet per category).
- **Category headers:** Gradient text.
- **Skill tags:** Glassmorphism pills with hover scale + tint animation.
- **Layout:** Cards stagger in, tags within each card cascade with delay.
- **No skill-level bars** — keep it clean and decorative-free.

### 7. Education

- **Timeline line:** Gradient (cyan → violet → amber) with subtle glow.
- **Timeline dots:** Glassmorphism circles with gradient border. B.Tech (current): pulsing cyan glow.
- **Cards:** Glassmorphism panels sliding in from alternating sides.
- **Period badges:** Monospace glassmorphism pills.
- **"Present" badge:** Animated pulsing tag on current education.

### 8. Hackathons & Certifications

- **Hackathon cards:** Glassmorphism panels, emoji icons with glow backdrop, hover lift + gradient border.
- **Certification list:** Glassmorphism pills with staggered reveal.
- **Section header:** Gradient "06." number.

### 9. Contact

- **Heading:** "Let's Build Something" in gradient text (cyan → violet).
- **Contact cards:** Glassmorphism panels with icons. Hover glow in respective accent colors (email=cyan, LinkedIn=#0077b5, GitHub=#fff, phone=amber).
- **CTA button:** Gradient background (cyan → violet), hover scale + glow shadow.
- **Background:** Large faint radial gradient glow behind the section.

### 10. Footer

- Glassmorphism top border (gradient line, 1px).
- Logo in gradient text.
- Social links in glassmorphism pills with hover glow.
- Credit line in muted text.

---

## Global Effects

### Particle Background

- Canvas-based, positioned fixed behind all content
- ~80 particles on desktop (1200px+), ~40 on tablet, ~25 on mobile
- Particles: small dots (1-2px) in cyan and violet
- Connections: faint lines between nearby particles (< 150px distance)
- Slow random drift, no mouse interaction (keeps it subtle)
- Pauses when tab is not visible (performance)

### Custom Cursor

- Default: small cyan dot (6px) + larger ring (32px) following with slight delay
- On interactive elements (links, buttons, cards): ring expands to 48px, dot stays
- Hidden on mobile/touch devices
- Uses `requestAnimationFrame` for smooth tracking

### Smooth Scroll

- Lenis library wrapping the entire app
- Duration: 1.2s for anchor scrolls
- Easing: ease-out cubic
- Touch support enabled for mobile

### Scroll Animations

- All section elements use Framer Motion `whileInView` with `once: true`
- Default animation: fade in + slide up (y: 40 → 0), duration 0.6s, ease out
- Stagger: 0.1s between sibling elements
- Cards: scale from 0.95 → 1 in addition to fade/slide

---

## Performance Strategy

### Desktop-first, Mobile Simplified

| Effect | Desktop | Mobile |
|--------|---------|--------|
| Particles | 80, full connections | 25, no connections |
| Custom cursor | Full | Disabled |
| 3D tilt | Enabled | Disabled |
| Parallax | Enabled | Disabled |
| Backdrop blur | 20px | 10px |
| Stagger animations | Full | Reduced delay |

### Code Splitting

- Three.js (for TiltCard) — dynamic import with `next/dynamic`, SSR disabled
- Particles — dynamic import
- Custom cursor — dynamic import, only on non-touch devices

### Bundle Budget

- Target: < 200kb JS gzipped for initial load
- Three.js tilt: consider replacing with CSS `perspective` + `transform` if bundle exceeds budget

---

## Content Updates

- Remove C++ from skills (user request — already absent in current data, verify)
- All other content remains as-is from the current portfolio

---

## Implementation Order

1. Design system (globals.css) — new tokens, glass utilities, gradient utilities
2. New shared components (GlassCard, GradientText, TiltCard, CountUp)
3. Global effects (ParticleBackground, CustomCursor, SmoothScroll)
4. Layout + Navigation upgrade
5. Hero upgrade
6. About upgrade
7. Experience upgrade
8. Projects upgrade
9. Skills upgrade
10. Education upgrade
11. Hackathons upgrade
12. Contact + Footer upgrade
13. Performance audit & mobile testing
14. Final polish

---

## Success Criteria

- [ ] Glassmorphism applied consistently to all cards, nav, and panels
- [ ] Particle background running smoothly at 60fps on desktop
- [ ] Custom cursor responds to all interactive elements
- [ ] All sections have scroll-triggered reveal animations
- [ ] Hero terminal has typing animation
- [ ] Stats have counting animation
- [ ] Project cards have 3D tilt effect on desktop
- [ ] Mobile experience is clean and performant (simplified effects)
- [ ] Lighthouse performance score > 85
- [ ] No layout shift (CLS < 0.1)
- [ ] All existing content preserved (minus C++ if present)
