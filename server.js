import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('./server/dist/index.js');
