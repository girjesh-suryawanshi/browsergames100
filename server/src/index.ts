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
const PORT = Number(process.env.PORT) || 3000;

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

// Serve static files from public directory if present
app.use(express.static(path.join(__dirname, '../public')));

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
const frontendDistPath = path.join(__dirname, '../../dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

