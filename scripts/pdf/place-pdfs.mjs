#!/usr/bin/env node
// Кладёт обе PDF-версии книги в корень каждой языковой версии сайта: build/ и build/en/.
// Ссылки «Скачать PDF» на главной и в подвале ведут на pathname:///data-catalogs-book.pdf и
// pathname:///data-catalogs-book-en.pdf, а Docusaurus подставляет в них адрес своей языковой версии.

import {copyFileSync, existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const files = [
  {name: 'data-catalogs-book.pdf', from: 'build'},
  {name: 'data-catalogs-book-en.pdf', from: 'build/en'},
];
const dirs = ['build', 'build/en'];

for (const {name, from} of files) {
  const source = path.join(ROOT, from, name);
  if (!existsSync(source)) {
    throw new Error(`Нет файла ${path.relative(ROOT, source)}: сначала соберите PDF (npm run pdf, npm run pdf:en).`);
  }
  for (const dir of dirs) {
    const target = path.join(ROOT, dir, name);
    if (target !== source) {
      copyFileSync(source, target);
      process.stdout.write(`[pdf] ${path.relative(ROOT, source)} → ${path.relative(ROOT, target)}\n`);
    }
  }
}
