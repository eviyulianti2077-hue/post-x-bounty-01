// Node 22 standard-library entrypoint for post-x-promote-make-your-own-bounty-01.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(BOT_DIR, 'POST.json');
const outputPath = join(OUTPUT_DIR, 'POST.json');

function fail(message: string): never {
  console.error(`POST.json validation failed: ${message}`);
  process.exit(1);
}

let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let document: unknown;
try {
  document = JSON.parse(raw.toString('utf8'));
} catch (err) {
  fail(`invalid JSON: ${(err as Error).message}`);
}

if (typeof document !== 'object' || document === null || Array.isArray(document)) {
  fail('top level must be a JSON object');
}

const url = (document as Record<string, unknown>).url;
if (typeof url !== 'string' || url.trim() !== url) {
  fail('url must be a string without surrounding whitespace');
}

let parsed: URL;
try {
  parsed = new URL(url);
} catch {
  fail('url is not a valid absolute URL');
}

if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
  fail('url protocol must be http or https');
}

if (parsed.port !== '') {
  fail('url must not specify a port');
}

if (!/^(?:www\.)?(?:x\.com|twitter\.com)$/i.test(parsed.hostname)) {
  fail('url host must be x.com or twitter.com');
}

if (parsed.search !== '' || parsed.hash !== '' || parsed.username !== '' || parsed.password !== '') {
  fail('url must not contain credentials, a query, or a fragment');
}

const match = /^\/([^/?#]+)\/status\/([0-9]+)\/?$/.exec(parsed.pathname);
if (!match) {
  fail('url must use /<handle>/status/<numeric-id>');
}

if (match[1].length > 15 || !/^[A-Za-z0-9_]+$/.test(match[1])) {
  fail('url contains an invalid X handle');
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(sourcePath, outputPath);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
