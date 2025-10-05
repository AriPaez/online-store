#!/usr/bin/env node
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const EXTS = ['.ts', '.tsx', '.js', '.mjs'];
const ROOT = process.argv[2] || 'src';
let exitCode = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full);
    } else if (EXTS.some(e => entry.endsWith(e))) {
      const content = readFileSync(full, 'utf8').trim();
      if (content.length === 0) {
        console.error(`EMPTY FILE: ${full}`);
        exitCode = 1;
      }
    }
  }
}

walk(ROOT);
if (exitCode) {
  console.error('\nDetected empty source files. Remove them or add implementation.');
}
process.exit(exitCode);
