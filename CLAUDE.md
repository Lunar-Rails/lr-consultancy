# Lunar Rails Consultancy — Project Context

## What this is
Marketing website for **Lunar Rails Consultancy LTD** — the advisory arm of the Lunar Rails group. Licensed in Ras Al Khaimah under the RAK Digital Assets Oasis Authority (License 07010347), a subsidiary of OTC Services DMCC.

The site communicates regulatory compliance and financial intelligence advisory for virtual asset businesses. Every word matters: no marketing slop, no em dashes, no "users" (always "principals" or "firms").

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite 5 |
| Routing | React Router v7 (BrowserRouter) |
| 3D / Hero | Three.js + @react-three/fiber + @react-three/drei |
| CSS | Plain CSS (global `src/index.css`) — no Tailwind, no CSS modules |
| Build output | `vite-plugin-singlefile` → single `dist/index.html` (all JS/CSS inlined) |
| Forms | Netlify Forms (static bot-detection form in `index.html`, React form POSTs to `/`) |
| Hosting target | Netlify (see `netlify.toml`) |
| Repo | https://github.com/Lunar-Rails/lr-consultancy |

---

## File structure

```
src/
  main.jsx          — Entry point; disables browser scroll restoration
  App.jsx           — Root component: BrowserRouter, AppContent, ScrollToTop
  index.css         — All styles (design tokens, components, animations)
  components/
    Beams.jsx       — Three.js animated beam background (hero section)
    Beams.css       — Canvas container styles
  pages/
    Privacy.jsx     — /privacy — placeholder, replace with real copy
    Terms.jsx       — /terms   — placeholder, replace with real copy

public/
  favicon.svg       — Logo mark SVG
  robots.txt        — Allows all crawlers including AI bots (GPTBot, ClaudeBot, Perplexity)
  sitemap.xml       — Update domain when confirmed
  llms.txt          — LLM-readable company/service summary

index.html          — Vite entry + Netlify form bot-detection (hidden static form)
netlify.toml        — Build: `npm run build`, publish: `dist`, SPA redirect rule
```

---

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | Home (inline in AppContent) | Dark hero + Beams + all sections |
| `/privacy` | `src/pages/Privacy.jsx` | Placeholder — replace copy |
| `/terms` | `src/pages/Terms.jsx` | Placeholder — replace copy |

---

## Design system — Light mode (default)

### Canvas & surfaces
```css
--bg: #F0EFF2          /* page background */
--surface: #FFFFFF     /* card / section surface */
--t1: #000000          /* primary text */
--t2: #3A3840          /* secondary text */
--t3: #7E7C86          /* muted text */
--t4: #A9A7B0          /* disabled / placeholder */
--b1: #D4D2D9          /* border default */
--b2: #A9A7B0          /* border strong */
```

### Brand signals
```css
--brand: #492BFF       /* Indigo — primary button fills, focus rings only */
--brand-hover: #3820D6
--eyebrow: #D69400     /* Amber gold — section eyebrows ONLY (dark: #FFBA0D) */
--cta-text: #B02C98    /* Magenta — text buttons with → only */
```

### Fonts
```css
--font-p: 'DM Sans'        /* headings, body — zero letter-spacing always */
--font-s: 'IBM Plex Sans'  /* UI labels, captions */
--font-m: 'IBM Plex Mono'  /* buttons, eyebrows, numbers — 0.08em tracking uppercase */
```

### Type scale (key sizes)
| Role | Font | Size | Weight |
|------|------|------|--------|
| Display hero | DM Sans | 64px | 700 |
| H1 section | DM Sans | 42px | 500 |
| Body | DM Sans | 16px | 400 |
| Button label | IBM Plex Mono | 13–14px | 500 uppercase |
| Eyebrow | IBM Plex Mono | 11–12px | 500 uppercase |

### Buttons
- Height: 38px (hero CTAs: 44px), border-radius: 4px — **no pills ever**
- Labels: IBM Plex Mono, uppercase, 0.08em tracking
- Primary: `#492BFF` bg, `#F0EFF2` text
- Secondary light: `#FFFFFF` bg, `#000` text, `1px solid #A9A7B0`
- Secondary dark (hero): `rgba(13,13,14,0.5)` bg, `#F0EFF2` text

### Logo rules
- **Black logo on light backgrounds** (`fill="currentColor"` + CSS `color: #000`)
- **White logo on dark backgrounds** (nav over Beams: CSS `color: #F0EFF2`)
- Never Indigo, never any other colour
- SVG source: `/Users/standard/Documents/01_Projects/LR Consultancy Ltd/Logo Kit/SVG/LR Consultancy Logo.svg`
- Inline paths stored in `logoPathsD` object at top of `App.jsx`

---

## Key components & patterns

### Nav
- Sticky, `z-index: 100`, backdrop-filter blur
- Dark theme (`nav-dark`): over Beams hero — white logo, muted white links
- Light theme (`nav-light`): over content sections — black logo, dark links
- Switches via `isHome` scroll listener on `heroAreaRef.current.getBoundingClientRect().bottom`
- Mobile: hamburger menu slides in, CONTACT US moves inside menu as last item

### Hero area
- `<div className="hero-area" ref={heroAreaRef}>` with `margin-top: -64px` to pull Beams behind sticky nav
- `<Beams rotation={45} beamHeight={40} speed={1.8} />` fills the container absolutely
- Hero content: centered, `text-align: center`, 200px top padding (desktop), 144px (mobile)

### Scroll reveal
- CSS classes: `.reveal` (fade-up) and `.reveal-stagger` (staggered children)
- Triggered via `IntersectionObserver` in `useEffect` — re-runs when `isHome` changes
- Immediately reveals elements in viewport on mount (avoids blank on SPA back-navigation)
- `prefers-reduced-motion`: all animations disabled

### ScrollToTop
- Uses `useLayoutEffect` (fires before paint) + `behavior: 'instant'` (overrides `scroll-behavior: smooth`)
- Hash navigation (`/#about` etc.) uses `scrollIntoView({ behavior: 'smooth' })` after 80ms
- Browser scroll restoration disabled: `history.scrollRestoration = 'manual'` in `main.jsx`

### Contact form
- Netlify Forms: static hidden form in `index.html` for bot detection
- React form uses `new URLSearchParams(new FormData(e.target))` — avoids `form.name` JS name conflict
- Honeypot: `name="bot-field"`, `tabIndex=-1`, `autoComplete="off"`, `aria-hidden`
- States: default → success (thank you message replaces form) / error (inline message with email fallback)
- Email notifications: configure in Netlify dashboard → Forms → contact → Form notifications → `info@lunarconsult.io`

---

## Content rules (brand voice)
- **No em dashes** — use periods, commas, colons, or restructure
- **No "users" or "customers"** — use "firms", "businesses", or "principals"
- **No marketing superlatives** — "revolutionary", "best-in-class", etc. are banned
- Lead with the conclusion. Substance over adjectives.
- Architectural metaphors: house, rooms, pillars, anchor, foundation

---

## Development workflow

```bash
npm run dev        # Vite dev server on localhost:4321
npm run build      # Production build → dist/index.html (single file)
git push origin main  # Triggers Netlify auto-deploy
```

**Live domain:** `https://lunarrailsconsultancy.com` — set across index.html, robots.txt, sitemap.xml, and llms.txt.

---

## Things to do before go-live
- [x] Replace Privacy Policy placeholder copy in `src/pages/Privacy.jsx`
- [x] Replace Terms of Service placeholder copy in `src/pages/Terms.jsx`
- [ ] Save logo PNG as `public/favicon-512.png` (used for Apple touch icon + og:image)
- [ ] Create `public/og-image.png` (1200×630) for social previews
- [x] Domain set to `https://lunarrailsconsultancy.com`
- [ ] Set up Netlify email notification: Forms → contact → `info@lunarconsult.io`
- [ ] Connect custom domain in Netlify dashboard
