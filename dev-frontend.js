import crypto from 'node:crypto';

if (!crypto.getRandomValues) {
  crypto.getRandomValues = function getRandomValues(arr) {
    return crypto.webcrypto.getRandomValues(arr);
  };
}

if (!globalThis.crypto || !globalThis.crypto.getRandomValues) {
  globalThis.crypto = crypto.webcrypto;
}

import { createServer } from 'vite';

console.log('🚀 Starting Vite dev server with WebCrypto polyfill...');
try {
  const server = await createServer();
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
} catch (e) {
  console.error('Error starting dev server:', e);
  process.exit(1);
}
