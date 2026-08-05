import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const candidates = [
  path.join(__dirname, 'server/dist/index.js'),
  path.join(__dirname, 'dist/index.js'),
  path.resolve('./server/dist/index.js')
];

const target = candidates.find(p => fs.existsSync(p));

if (!target) {
  console.error('[Hostinger Startup Error] Compiled server entry file not found. Checked:', candidates);
}

require(target || path.join(__dirname, 'server/dist/index.js'));
