const fs = require('fs');
const path = require('path');

function pickPayload(raw){return raw.lighthouseResult?raw.lighthouseResult:raw}

const beforePathCandidates = [
  '/workspace/reports/lighthouse/intellux_ai_home.report.json',
  '/workspace/lh-desktop.json',
  '/workspace/lh-mobile.json'
];
let before=null,beforeSrc=null;
for(const p of beforePathCandidates){try{const raw=JSON.parse(fs.readFileSync(p,'utf8'));const pl=pickPayload(raw);if(pl && pl.categories){before=pl;beforeSrc=p;break;}}catch(e){}}

const afterPath='/workspace/reports/lighthouse/intellux_ai_home.after.json';
const after=pickPayload(JSON.parse(fs.readFileSync(afterPath,'utf8')));

function scores(obj){
  return {
    performance: Math.round((obj.categories.performance?.score||0)*100),
    accessibility: Math.round((obj.categories.accessibility?.score||0)*100),
    bestPractices: Math.round((obj.categories['best-practices']?.score||0)*100),
    seo: Math.round((obj.categories.seo?.score||0)*100)
  };
}

const b = before? scores(before): {performance: NaN, accessibility: NaN, bestPractices: NaN, seo: NaN};
const a = scores(after);

const lines=[];
lines.push('# Lighthouse BEFORE vs AFTER');
lines.push('');
lines.push(`Before source: ${beforeSrc||'unknown (fallback lh-desktop.json/lh-mobile.json used earlier)'}`);
lines.push('');
lines.push('| Category | BEFORE | AFTER | Δ |');
lines.push('|---|---:|---:|---:|');
for(const key of ['performance','accessibility','bestPractices','seo']){
  const beforeVal = b[key];
  const afterVal = a[key];
  const delta = (isNaN(beforeVal)? 'n/a' : `${afterVal-(beforeVal||0)}`);
  lines.push(`| ${key} | ${isNaN(beforeVal)?'n/a':beforeVal} | ${afterVal} | ${delta} |`);
}

fs.writeFileSync('/workspace/reports/lighthouse/_delta.md', lines.join('\n'));
console.log('Wrote /workspace/reports/lighthouse/_delta.md');
