"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.initDb = initDb;
exports.syncAdminUser = syncAdminUser;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || 'mysql://u235459051_admin:Crompton@1310@127.0.0.1:3306/u235459051_browsergames';
exports.pool = promise_1.default.createPool(dbUrl);
// Ensure tables exist on startup
async function initDb() {
    try {
        const conn = await exports.pool.getConnection();
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
        conn.release();
        console.log('✅ MySQL database tables initialized');
    }
    catch (err) {
        console.warn('MySQL init warning:', err);
    }
}
// Auto-seed default admin user
async function syncAdminUser(email = 'admin@browsergames100.com', password = 'admin123') {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [rows] = await exports.pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (rows.length === 0) {
            const id = crypto_1.default.randomUUID();
            await exports.pool.query('INSERT INTO User (id, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)', [id, email, hashedPassword, 'BrowserGames100 Admin', 'ADMIN']);
        }
        else {
            await exports.pool.query('UPDATE User SET password = ?, role = ? WHERE email = ?', [hashedPassword, 'ADMIN', email]);
        }
        console.log(`✅ MySQL Admin user synchronized: ${email}`);
    }
    catch (err) {
        console.warn('MySQL syncAdminUser warning:', err);
    }
}
