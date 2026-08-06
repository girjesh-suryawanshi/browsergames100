import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || 'mysql://u235459051_admin:Crompton@1310@127.0.0.1:3306/u235459051_browsergames';

export const pool = mysql.createPool(dbUrl);

// Ensure tables exist on startup
export async function initDb() {
  try {
    const conn = await pool.getConnection();

    await conn.query(`
      CREATE TABLE IF NOT EXISTS User (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(191) NOT NULL,
        fullName VARCHAR(191),
        role VARCHAR(191) NOT NULL DEFAULT 'USER',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS Category (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) UNIQUE NOT NULL,
        description VARCHAR(191),
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS BlogPost (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        slug VARCHAR(191) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        authorName VARCHAR(191) NOT NULL DEFAULT 'Admin',
        readingTime VARCHAR(191),
        isPublished TINYINT(1) NOT NULL DEFAULT 0,
        isFeatured TINYINT(1) NOT NULL DEFAULT 0,
        publishedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        coverImage VARCHAR(191),
        seoTitle VARCHAR(191),
        seoDescription VARCHAR(191),
        categoryId VARCHAR(191),
        CONSTRAINT fk_blog_category FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS GameStat (
        id VARCHAR(191) PRIMARY KEY,
        gameId INT UNIQUE NOT NULL,
        slug VARCHAR(191) UNIQUE NOT NULL,
        playCount INT NOT NULL DEFAULT 0,
        likeCount INT NOT NULL DEFAULT 0,
        dislikeCount INT NOT NULL DEFAULT 0,
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS GameSubmission (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        url VARCHAR(191) NOT NULL,
        email VARCHAR(191),
        notes TEXT,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS ContactMessage (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL,
        subject VARCHAR(191),
        message TEXT NOT NULL,
        status VARCHAR(191) NOT NULL DEFAULT 'UNREAD',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS UserFavorite (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        gameId INT NOT NULL,
        gameSlug VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        UNIQUE KEY uq_user_game (userId, gameId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    conn.release();
    console.log('✅ MySQL database tables initialized');
  } catch (err) {
    console.warn('MySQL init warning:', err);
  }
}

// Auto-seed default admin user
export async function syncAdminUser(email = 'admin@browsergames100.com', password = 'admin123') {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows]: any = await pool.query('SELECT * FROM User WHERE email = ?', [email]);

    if (rows.length === 0) {
      const id = crypto.randomUUID();
      await pool.query(
        'INSERT INTO User (id, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)',
        [id, email, hashedPassword, 'BrowserGames100 Admin', 'ADMIN']
      );
    } else {
      await pool.query(
        'UPDATE User SET password = ?, role = ? WHERE email = ?',
        [hashedPassword, 'ADMIN', email]
      );
    }
    console.log(`✅ MySQL Admin user synchronized: ${email}`);
  } catch (err) {
    console.warn('MySQL syncAdminUser warning:', err);
  }
}
