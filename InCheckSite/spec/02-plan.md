# 02-plan.md — Implementation Plan

## Repo Layout
- `content/` — trim copy; create EMS & Enterprise product pages
- `layouts/partials/` — `hero.html`, `cta.html`, `feature-cards.html`, `footer.html`
- `assets/css/incheck.css` — single compiled stylesheet (preferred)
- `static/img/` — optimized images

## Steps
1. **Branch**: `feature/ui-refresh`
2. **Design Tokens**: add color vars, radius, spacing to `incheck.css`
3. **Home Hero**: new partial + CTA; wire into `layouts/_default/baseof.html` or page layout
4. **Feature Cards**: filled icons, ≥12px radius
5. **Products EMS**: add sections, anchors, CTA block
6. **Products Enterprise**: Angel/El Chat/Translate + comparison grid
7. **Nav/Footer**: tighten, add persistent CTA
8. **Accessibility pass**: headings, landmarks, focus styles, alt text
9. **Performance**: image sizes, preload primary font if used
10. **Cloudflare build**:
    - No Node: commit `assets/css/incheck.css` and run `hugo --minify`
    - With Node: `npm ci && npm run build:css && hugo --minify`
11. **PR**: add reviewer checklist; share preview URL
12. **Merge** after approvals

## Rollout
- Ship Home + EMS first (quick wins), then Enterprise, then Contact polish
