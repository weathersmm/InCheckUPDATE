const fs = require('fs');
const path = require('path');

function pickPayload(d) {
  if (!d) return null;
  return d.lighthouseResult ? d.lighthouseResult : d;
}

function tryLoad(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

const candidates = [
  '/workspace/reports/lighthouse/intellux_ai_home.report.json',
  '/workspace/lh-desktop.json',
  '/workspace/lh-mobile.json',
];

let src = null;
let data = null;
for (const p of candidates) {
  const raw = tryLoad(p);
  const payload = pickPayload(raw);
  if (payload && payload.audits) {
    src = p;
    data = payload;
    break;
  }
}

if (!data) {
  console.error('No Lighthouse report found in expected locations.');
  process.exit(2);
}

const audits = data.audits;
const opportunities = Object.values(audits).filter(
  (a) => a && a.details && a.details.type === 'opportunity'
);
const diagnostics = Object.values(audits).filter(
  (a) => a && (a.group === 'diagnostics' || a.details?.type === 'diagnostic')
);

function fmt(item) {
  const ms = (item.details && item.details.overallSavingsMs) || 0;
  const by = (item.details && item.details.overallSavingsBytes) || 0;
  return {
    id: item.id,
    title: item.title || item.id,
    savingsMs: ms,
    savingsBytes: by,
    description: (item.description || '').replace(/\s+/g, ' ').trim(),
  };
}

const items = opportunities
  .map(fmt)
  .sort((a, b) => (b.savingsMs || b.savingsBytes) - (a.savingsMs || a.savingsBytes))
  .slice(0, 10);

const lines = [];
lines.push('# Baseline Lighthouse Opportunities');
lines.push('');
lines.push(`Source: ${src}`);
lines.push('');
lines.push('| Rank | Audit | Potential savings |');
lines.push('|---:|---|---:|');
items.forEach((o, i) => {
  const sv = o.savingsMs ? `${Math.round(o.savingsMs)} ms` : `${Math.round((o.savingsBytes || 0) / 1024)} KB`;
  lines.push(`| ${i + 1} | ${o.title} | ${sv} |`);
});
lines.push('');
lines.push('## Notes');
items.forEach((o, i) => {
  lines.push(`- ${i + 1}. ${o.title}: ${o.description.slice(0, 220)}`);
});
lines.push('');
lines.push('## Top Diagnostics');
Diagnostics = diagnostics.slice(0, 10).map((d) => d.title || d.id);
Diagnostics.forEach((t) => lines.push(`- ${t}`));

const outDir = '/workspace/reports/lighthouse';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, '_baseline_summary.md'), lines.join('\n'));
console.log('Wrote', path.join(outDir, '_baseline_summary.md'));
