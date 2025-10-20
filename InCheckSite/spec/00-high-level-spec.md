/**
 * 00-high-level-spec.md — InCheck.ai site refresh (Hugo + Cloudflare Pages)
 */

# Project
InCheck.ai site refresh using Hugo; deploy via Cloudflare Pages. Keep production safe (only main merges go live). Use branch previews for review.

# Goals
- Modernize UI/UX; cut text bloat; sharpen EMS “Products” page + parallel “Enterprise” page.
- Clear CTAs (“Book a demo”), fewer than ~600 words on landing.
- Avoid the default AI “indigo/purple vibe”; use neutral blue-gray with a warm accent; card radius ≥ 12px; prefer filled icons.

# Scope & Constraints
- Static site only (Hugo). No server runtime.
- Either ship a prebuilt CSS file (no Node on Cloudflare) OR run a tiny Tailwind build (≤ ~3s) via Cloudflare build step.
- Maintain existing Cloudflare Pages setup: branch=preview, main=production.
- Keep image assets optimized; no heavy animation libs.

# Information Architecture
- Home (focus hero, 3 value props, social proof, primary CTA)
- Products → EMS (Decision Support, Narrative, HAZMAT, Training, Translation, Security/Audit)
- Products → Enterprise (Angel, El Chat, Translate; compact comparison)
- Contact / Demo

# Copy Principles
Plain language, active voice, short sentences, specific proof. Avoid filler.

# Success Criteria
- Lighthouse mobile ≥ 95; Accessibility ≥ 95.
- Above-the-fold CTA on Home; section-end CTAs.
- Cloudflare preview link for every PR; reviewer checklist (copy/a11y/mobile).

# Risks
- Tailwind build on Cloudflare adds seconds—may opt to prebuild CSS locally and commit.
- Hugo partial naming conflicts—keep components scoped.

# Out of Scope
- CMS migration; complex animations; server APIs.
