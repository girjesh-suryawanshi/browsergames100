const fs = require('fs');
const sql = fs.readFileSync('./server/migrate-blogs.sql', 'utf8');

// Extract all coverImage values from SQL INSERTs
// Pattern: line containing 'https://images.unsplash.com...' as the coverImage column value
const lines = sql.split('\n');
const imageLines = lines.filter(l => l.trim().startsWith("'https://images.unsplash.com"));

console.log(`Total coverImage URLs found: ${imageLines.length}`);
console.log('');

imageLines.forEach((line, i) => {
  const url = line.trim().replace(/^'|',?\s*$/g, '');
  const isEmpty = !url || url.trim() === '';
  console.log(`[${i + 1}] ${isEmpty ? '❌ EMPTY/MISSING' : '✅ ' + url.substring(0, 90)}`);
});

console.log('\n--- SUMMARY ---');
const valid = imageLines.filter(l => {
  const u = l.trim().replace(/^'|',?\s*$/g, '');
  return u && u.startsWith('https://');
});
console.log(`Valid images: ${valid.length}/${imageLines.length}`);
console.log(`Missing/empty: ${imageLines.length - valid.length}`);
