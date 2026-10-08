const fs = require('fs');

const content = fs.readFileSync('./src/data/static-blogs.ts', 'utf8');
const postBlocks = content.split(/\{\s*id:/).slice(1);

let output = `Total post blocks found: ${postBlocks.length}\n`;

const posts = postBlocks.map((block, index) => {
  const idMatch = block.match(/^\s*["']([^"']+)["']/);
  const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
  const publishedAtMatch = block.match(/publishedAt:\s*["']([^"']+)["']/);
  const coverImageMatch = block.match(/coverImage:\s*["']([^"']*)["']/);

  return {
    index: index + 1,
    id: idMatch ? idMatch[1] : 'unknown',
    title: titleMatch ? titleMatch[1] : 'unknown',
    publishedAt: publishedAtMatch ? publishedAtMatch[1] : 'MISSING',
    coverImage: coverImageMatch ? coverImageMatch[1] : 'MISSING'
  };
});

posts.forEach(p => {
  const hasImg = p.coverImage && p.coverImage !== 'MISSING' && p.coverImage.trim() !== '';
  output += `[${p.index}] ID: ${p.id} | Date: ${p.publishedAt} | Image: ${hasImg ? p.coverImage : '❌ NO IMAGE'}\n`;
});

fs.writeFileSync('./blog_audit.txt', output, 'utf8');
console.log("SUCCESS");
