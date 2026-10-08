const fs = require('fs');

let content = fs.readFileSync('./src/data/static-blogs.ts', 'utf8');

const gamingImages = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542751110-97427bbecfd8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
];

// Base date: Today is 2026-09-30 (30-09-2026)
const baseDate = new Date('2026-09-30T10:00:00.000Z');

let postIndex = 0;
content = content.replace(/publishedAt:\s*"[^"]*"/g, () => {
  const d = new Date(baseDate.getTime() - postIndex * 24 * 60 * 60 * 1000);
  postIndex++;
  return `publishedAt: "${d.toISOString()}"`;
});

let updateIndex = 0;
content = content.replace(/updatedAt:\s*"[^"]*"/g, () => {
  const d = new Date(baseDate.getTime() - updateIndex * 24 * 60 * 60 * 1000);
  updateIndex++;
  return `updatedAt: "${d.toISOString()}"`;
});

let imgIndex = 0;
content = content.replace(/coverImage:\s*"([^"]*)"/g, (match, p1) => {
  if (!p1 || p1.trim() === '' || p1.includes('placeholder')) {
    const fallback = gamingImages[imgIndex % gamingImages.length];
    imgIndex++;
    return `coverImage: "${fallback}"`;
  }
  imgIndex++;
  return match;
});

fs.writeFileSync('./src/data/static-blogs.ts', content, 'utf8');
console.log(`Updated ${postIndex} posts successfully!`);
