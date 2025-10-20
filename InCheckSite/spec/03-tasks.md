# 03-tasks.md — Actionable Tasks

- [ ] Create `assets/css/incheck.css` with tokens:
      - [ ] Colors (blue-gray base, warm accent); **exclude indigo/purple**
      - [ ] Radius var `--radius: 14px`
      - [ ] Button + link focus styles

- [ ] Home page
      - [ ] New hero partial with single-line promise + subline + **Book a demo**
      - [ ] 3 value props (filled icons, concise copy)
      - [ ] Proof strip (logos or 1-liner testimonial)
      - [ ] CTA block at end

- [ ] Products → EMS
      - [ ] Sections: Decision Support, Narrative, HAZMAT, Training, Translation, Security/Audit
      - [ ] Each: 1–2 sentences + “Learn more” anchors
      - [ ] CTA at top and bottom

- [ ] Products → Enterprise
      - [ ] Angel / El Chat / Translate blurbs
      - [ ] Comparison grid (3–4 rows max)
      - [ ] CTA block

- [ ] Navigation & Footer
      - [ ] Persistent primary CTA in header
      - [ ] Footer links (legal, contact, social)

- [ ] Accessibility
      - [ ] Semantic headings, landmarks
      - [ ] Alt text, keyboard focus rings, skip link

- [ ] Performance
      - [ ] Optimize hero images
      - [ ] Lighthouse mobile ≥95; A11y ≥95 on preview

- [ ] CI/CD
      - [ ] Cloudflare build uses prebuilt CSS (no Node) **or** minimal Tailwind step
      - [ ] Branch previews enabled; main = production

**File map hints**
- Copy edits: `content/_index.md`, `content/products/ems/_index.md`, `content/products/enterprise/_index.md`
- Layouts: `layouts/partials/{hero.html,feature-cards.html,cta.html,footer.html}`
- CSS: `assets/css/incheck.css`
