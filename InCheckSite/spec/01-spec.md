# 01-spec.md — Structured Spec

## Architecture
- Static site generator: Hugo
- Hosting/CI: Cloudflare Pages
- CSS: prebuilt `assets/css/incheck.css` (preferred); optional minimal Tailwind pipeline
- Icons: filled variant (Heroicons/Lucide filled)

## Design System Guardrails
- Palette: blue-gray base + single warm accent; **no indigo/purple**
- Corners: ≥ 12px
- Buttons: solid primary; clear hover/focus states; large tap targets
- Typography: concise, 2–3 sizes per section

## Pages & Sections
### Home
- Hero: one-line promise + subline + **Book a demo**
- “How it helps” (3 value props with filled icons)
- Proof/Logos or short testimonial
- Secondary CTA block

### Products → EMS
- Decision Support, Narrative, HAZMAT, Training, Translation, Security/Audit
- Each: 1–2 sentences + “Learn more” (anchor)

### Products → Enterprise
- Angel, El Chat, Translate (what it is + benefit)
- Compact comparison grid
- CTA: “Talk to us”

### Contact / Demo
- Form or mailto + calendar link area (stub acceptable)

## Navigation & Footer
- Lean header; persistent primary CTA
- Footer: legal, contact, social, brief tagline

## Performance & A11y
- Lighthouse mobile ≥95; A11y ≥95
- Semantic headings; alt text; focus outline; skip link

## Deployment
- Branch builds = Preview; main = Production
