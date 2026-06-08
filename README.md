# Lunar Rails Consultancy

Marketing website for **Lunar Rails Consultancy LTD** — compliance-first advisory for firms operating in virtual assets. Regulatory guidance and cost intelligence, structured for action.

Licensed in Ras Al Khaimah under the RAK Digital Assets Oasis Authority (License 07010347). A subsidiary of OTC Services DMCC.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router v7 |
| 3D / Hero animation | Three.js + @react-three/fiber + @react-three/drei |
| Styling | Plain CSS (no Tailwind) |
| Forms | Netlify Forms |
| Deployment | Netlify |
| Build output | Single self-contained `dist/index.html` via `vite-plugin-singlefile` |

---

## Getting started

### Prerequisites
- Node.js 20+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:4321](http://localhost:4321) with hot module replacement.

### Production build

```bash
npm run build
```

Outputs `dist/index.html` — a single self-contained HTML file with all JS and CSS inlined. Open directly in any browser, no server required.

---

## Project structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Root component — router, nav, footer, all routes
├── index.css             # Global styles and design tokens
├── components/
│   ├── Beams.jsx         # Three.js animated beam background (hero)
│   └── Beams.css
└── pages/
    ├── Privacy.jsx       # /privacy — replace placeholder with real copy
    └── Terms.jsx         # /terms   — replace placeholder with real copy

public/
├── favicon.svg           # Logo mark
├── robots.txt            # Crawler permissions (includes AI bots)
├── sitemap.xml           # Update with live domain before launch
└── llms.txt              # LLM-readable company summary

index.html                # Vite entry + Netlify form detection
netlify.toml              # Build config for Netlify
CLAUDE.md                 # AI assistant context (stack, tokens, rules)
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero with Beams animation, all sections |
| `/privacy` | Privacy Policy (placeholder) |
| `/terms` | Terms of Service (placeholder) |

---

## Deployment

The site deploys automatically via Netlify on every push to `main`.

Build settings (from `netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20

### Form notifications
Contact form submissions are handled by Netlify Forms. To receive email notifications:

1. Deploy the site
2. Netlify dashboard → **Forms** → `contact`
3. **Form notifications** → **Add notification** → **Email notification**
4. Set recipient: `info@lunarconsult.io`

---

## Pre-launch checklist

- [ ] Replace Privacy Policy placeholder copy in `src/pages/Privacy.jsx`
- [ ] Replace Terms of Service placeholder copy in `src/pages/Terms.jsx`
- [ ] Save logo PNG as `public/favicon-512.png` (Apple touch icon + og:image fallback)
- [ ] Create `public/og-image.png` at 1200×630px for social previews
- [ ] Replace all `lrconsultancy.com` placeholders with the live domain in:
  - `index.html` (canonical, og:url, og:image, JSON-LD)
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/llms.txt`
- [ ] Configure Netlify email notification for form submissions
- [ ] Connect custom domain in Netlify dashboard

---

## Design system

Full token reference is in `CLAUDE.md`. Key rules:

- **Light mode default** — page `#F0EFF2`, surface `#FFFFFF`
- **Indigo `#492BFF`** — primary buttons and focus rings only
- **Amber `#D69400`** — section eyebrows only
- **Logo** — black on light, white on dark. Never recoloured
- **DM Sans** — headings and body, zero letter-spacing always
- **IBM Plex Mono** — all buttons and eyebrows, uppercase, 0.08em tracking
- **No em dashes** anywhere in copy
- **No "users"** — always "firms" or "principals"

---

## License

Private. All rights reserved — Lunar Rails Consultancy LTD.
