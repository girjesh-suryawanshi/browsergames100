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
import { fork } from 'node:child_process';
import path from 'node:path';

console.log('🚀 Building Vite frontend for production...');
build()
  .then(() => {
    console.log('✅ Vite frontend build complete!');
    console.log('⚡ Generating pre-rendered static pages for Google AdSense...');
    const prerender = fork(path.resolve('./scripts/prerender-static.js'));
    prerender.on('exit', (code) => {
      if (code === 0) {
        console.log('🎉 Full production build and static pre-rendering complete!');
      } else {
        console.error('❌ Pre-rendering failed with code:', code);
        process.exit(code || 1);
      }
    });
  })
  .catch((err) => {
    console.error('❌ Vite build error:', err);
    process.exit(1);
  });
