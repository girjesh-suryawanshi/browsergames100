import crypto from 'node:crypto';

if (!crypto.getRandomValues) {
  crypto.getRandomValues = function getRandomValues(arr) {
    return crypto.webcrypto.getRandomValues(arr);
  };
}

if (!globalThis.crypto || !globalThis.crypto.getRandomValues) {
  globalThis.crypto = crypto.webcrypto;
}

import { build } from 'vite';

console.log('🚀 Building Vite frontend for production...');
build()
  .then(() => {
    console.log('✅ Vite frontend build complete!');
  })
  .catch((err) => {
    console.error('❌ Vite build error:', err);
    process.exit(1);
  });
