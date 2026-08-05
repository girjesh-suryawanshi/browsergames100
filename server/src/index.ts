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
    break;
  }
}

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

const PORT = process.env.PORT || 3000;

if (typeof PORT === 'string' && (PORT.startsWith('/') || PORT.startsWith('\\\\'))) {
  app.listen(PORT, () => {
    console.log(`Server is running on socket ${PORT}`);
  });
} else {
  const numericPort = Number(PORT) || 3000;
  app.listen(numericPort, () => {
    console.log(`Server is running on port ${numericPort}`);
  });
}

