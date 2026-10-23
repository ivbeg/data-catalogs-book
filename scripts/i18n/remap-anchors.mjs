// Replaces Russian heading anchors in English docs with the English ones.
// Headings are matched by order: each EN file keeps the RU heading order.
import fs from 'node:fs';
import path from 'node:path';
import {createSlugger} from '@docusaurus/utils';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const ruDir = path.join(root, 'docs');
const enDir = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const write = !process.argv.includes('--check');

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.mdx?$/.test(e.name) ? [p] : [];
  });
}

function headingIds(text) {
  const slugger = createSlugger();
  const ids = [];
  let fence = null;
  for (const line of text.split('\n')) {
    const f = line.match(/^\s*(```+|~~~+)/);
    if (f) {
      if (!fence) fence = f[1];
      else if (line.trim().startsWith(fence)) fence = null;
      continue;
    }
    if (fence) continue;
    const m = line.match(/^(#{2,6})\s+(.*?)\s*#*\s*$/);
    if (!m) continue;
    let h = m[2];
    const explicit = h.match(/\{#([^}]+)\}\s*$/);
    if (explicit) { ids.push(explicit[1]); slugger.slug(explicit[1]); continue; }
    h = h.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, '')
      .replace(/[*_`]/g, (c) => (c === '_' ? '_' : ''));
    ids.push(slugger.slug(h));
  }
  return ids;
}

const maps = new Map();
for (const ru of walk(ruDir)) {
  const rel = path.relative(ruDir, ru);
  const en = path.join(enDir, rel);
  if (!fs.existsSync(en)) { console.warn(`missing EN: ${rel}`); continue; }
  const a = headingIds(fs.readFileSync(ru, 'utf8'));
  const b = headingIds(fs.readFileSync(en, 'utf8'));
  if (a.length !== b.length) console.warn(`heading count differs in ${rel}: ${a.length} vs ${b.length}`);
  const m = new Map();
  a.forEach((id, i) => { if (b[i] !== undefined) m.set(id, b[i]); });
  maps.set(en, m);
}

let changed = 0, unresolved = 0;
for (const file of walk(enDir)) {
  const src = fs.readFileSync(file, 'utf8');
  const out = src.replace(/\]\(([^)\s#]*)#([^)\s]+)\)/g, (all, target, frag) => {
    if (/^[a-z]+:/i.test(target) && !target.startsWith('pathname:')) return all;
    if (/^[\x00-\x7f]*$/.test(decodeURIComponent(frag))) return all;
    const t = target ? path.resolve(path.dirname(file), target) : file;
    const m = maps.get(t);
    const id = m?.get(decodeURIComponent(frag));
    if (!id) { unresolved++; console.warn(`unresolved: ${path.relative(enDir, file)} -> ${target}#${frag}`); return all; }
    changed++;
    return `](${target}#${id})`;
  });
  if (write && out !== src) fs.writeFileSync(file, out);
}
console.log(`${changed} anchors remapped, ${unresolved} unresolved${write ? '' : ' (check only)'}`);
