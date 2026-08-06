import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import blogRoutes from './routes/blog';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';
import ogRoutes from './routes/og';
import seoRoutes from './routes/seo';
import gameStatRoutes from './routes/gameStats';
import favoriteRoutes from './routes/favorites';
import submissionRoutes from './routes/submissions';
import { prisma } from './lib/prisma';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Process error handlers to prevent silent crashes on Hostinger
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Serve uploaded images from the persistent volume
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Serve static game data catalog (/data)
const dataDirs = [
  path.join(process.cwd(), 'public/data'),
  path.join(process.cwd(), 'dist/data'),
  path.join(__dirname, '../../public/data'),
  path.join(__dirname, '../public/data')
];

for (const dir of dataDirs) {
  if (fs.existsSync(dir)) {
    app.use('/data', express.static(dir));
  }
}

// Fallback explicit route for game data catalog files
app.get('/data/:filename', (req, res, next) => {
  const filename = req.params.filename;
  for (const dir of dataDirs) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }
  next();
});

// Serve root public folder if present
const publicDirs = [
  path.join(process.cwd(), 'public'),
  path.join(__dirname, '../../public'),
  path.join(__dirname, '../public')
];

for (const dir of publicDirs) {
  if (fs.existsSync(dir)) {
    app.use(express.static(dir));
  }
}

import bcrypt from 'bcryptjs';

async function autoSeed() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@browsergames100.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          fullName: 'BrowserGames100 Admin',
          role: 'ADMIN',
        },
      });
      console.log(`✅ Auto-seeded admin user: ${adminEmail}`);
    }

    const defaultCategories = [
      { name: 'Game Guides', description: 'In-depth strategy guides and walkthroughs for popular unblocked games.' },
      { name: 'Top Picks', description: 'Curated roundups and top 10 lists of the best browser games.' },
      { name: 'Unblocked Picks', description: 'Games tested and verified to run on school Chromebooks and restricted networks.' },
      { name: 'Game Updates', description: 'Latest news, balance updates, and patch notes for browser games.' },
    ];

    for (const cat of defaultCategories) {
      await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: cat,
      });
    }
  } catch (err) {
    console.warn('Auto-seed skipped (database tables will be initialized on first write):', err);
  }
}

// Health & Database Connection Check Route
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error?.message || String(error),
      timestamp: new Date().toISOString()
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/games', gameStatRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/submissions', submissionRoutes);

// OG tag proxy for social media bots
app.use('/api/og', ogRoutes);

// SEO endpoints: blog sitemap + RSS feed
app.use('/', seoRoutes);

// Serve compiled React frontend (dist) if hosted together with Node.js
const distDirs = [
  path.join(process.cwd(), 'dist'),
  path.join(__dirname, '../../dist'),
  path.join(__dirname, '../dist')
];

let foundDistDir: string | null = null;
for (const dir of distDirs) {
  if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))) {
    foundDistDir = dir;
    break;
  }
}

if (foundDistDir) {
  app.use(express.static(foundDistDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
      return next();
    }
    res.sendFile(path.join(foundDistDir!, 'index.html'));
  });
}

const port = process.env.PORT || 3000;

app.listen(port as any, "0.0.0.0", () => {
  console.log(`Server running on ${port}`);
  autoSeed().catch((err) => console.warn('Background autoSeed warning:', err));
});

