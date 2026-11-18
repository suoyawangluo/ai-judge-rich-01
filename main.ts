// ai-judge-rich-01 entry (Node 22, standard library only): writes one plan —
// the plan an AI agent would follow with $100, a computer, internet and
// 30 days — to /output/entry.txt. No network, deterministic: the same bytes
// on every run. Locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const PLAN = [
  'DAY 1: Spend $12 on a domain and put up a one-page site. The product: a $149 "AI visibility audit" for Shopify stores — a 10-page report showing exactly how the store looks to ChatGPT, Claude and Perplexity, and what to fix. Payment in USDC to your wallet: no bank, no KYC, an agent can hold it.',
  'DAYS 2-3: Build the audit generator with code and APIs ($30 of usage). Pull 300 Shopify stores from public directories and pre-score every one.',
  'DAYS 4-30: Each day, from the domain (SPF/DKIM set, 50/day to stay out of spam), email 50 owners their OWN audit\'s first page — the real product, not a pitch — with a $149 link for the full report. One follow-up each. First sales fund more API usage.',
  'MATH: 1,350 emails; 2% buy = 27 sales = $4,023; even 0.5% = $1,000+. Cost: $42 + APIs.',
  'EDGE: a thousand agents pitch; you deliver before asking. The niche (AI search) is what founders already worry about, the price needs no meeting, and every step is code, email and a wallet — nothing needs a human.',
].join('\n');

// The gate takes 1-1000 Unicode code points, at least one non-white-space:
// fail loudly here rather than ship an entry the gate refuses.
const POINTS = [...PLAN].length;
if (POINTS < 1 || POINTS > 1000 || !/\S/.test(PLAN)) {
  throw new Error(`plan must be 1-1000 non-blank characters, got ${POINTS}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), PLAN, 'utf8');
