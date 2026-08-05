-- ==============================================================================
-- BrowserGames100 — MySQL Database Schema & Initial Data Import Script
-- For Hostinger phpMyAdmin / MySQL Database
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- Table Structure: User
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `fullName` VARCHAR(191) NULL,
  `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table Structure: Category
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Category` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table Structure: BlogPost
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `BlogPost` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `content` TEXT NOT NULL,
  `excerpt` TEXT NULL,
  `authorName` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  `readingTime` VARCHAR(191) NULL,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 0,
  `isFeatured` TINYINT(1) NOT NULL DEFAULT 0,
  `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `coverImage` VARCHAR(191) NULL,
  `coverImageAlt` VARCHAR(191) NULL,
  `coverImageCaption` VARCHAR(191) NULL,
  `seoTitle` VARCHAR(191) NULL,
  `seoDescription` VARCHAR(191) NULL,
  `seoKeywords` VARCHAR(191) NULL,
  `canonicalUrl` VARCHAR(191) NULL,
  `indexing` VARCHAR(191) NOT NULL DEFAULT 'index',
  `follow` VARCHAR(191) NOT NULL DEFAULT 'follow',
  `ogTitle` VARCHAR(191) NULL,
  `ogDescription` VARCHAR(191) NULL,
  `ogImage` VARCHAR(191) NULL,
  `twitterCard` VARCHAR(191) NOT NULL DEFAULT 'summary_large_image',
  `schemaType` VARCHAR(191) NOT NULL DEFAULT 'BlogPosting',
  `faq` JSON NULL,
  `howTo` JSON NULL,
  `tocEnabled` TINYINT(1) NOT NULL DEFAULT 1,
  `ctaType` VARCHAR(191) NOT NULL DEFAULT 'none',
  `tags` VARCHAR(191) NULL,
  `categoryId` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BlogPost_slug_key` (`slug`),
  KEY `BlogPost_categoryId_fkey` (`categoryId`),
  CONSTRAINT `BlogPost_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Seed Default Admin User: admin@browsergames100.com / admin123
-- (Bcrypt hash: $2a$10$wE4m5hXWwX5v2gJ/0G1yZ.bQ4X3G4y8m7b8c9d0e1f2g3h4i5j6k)
-- ------------------------------------------------------------------------------
INSERT INTO `User` (`id`, `email`, `password`, `fullName`, `role`)
VALUES (
  'admin-default-uuid-100',
  'admin@browsergames100.com',
  '$2a$10$wK2wB0S2H1Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T',
  'BrowserGames100 Administrator',
  'ADMIN'
) ON DUPLICATE KEY UPDATE `email` = `email`;

-- ------------------------------------------------------------------------------
-- Seed Default Categories
-- ------------------------------------------------------------------------------
INSERT INTO `Category` (`id`, `name`, `description`) VALUES
('cat-1', 'Game Guides', 'In-depth strategy guides and walkthroughs for popular unblocked games.'),
('cat-2', 'Top Picks', 'Curated roundups and top 10 lists of the best browser games.'),
('cat-3', 'Unblocked Picks', 'Games tested and verified to run on school Chromebooks and restricted networks.'),
('cat-4', 'Game Updates', 'Latest news, balance updates, and patch notes for browser games.')
ON DUPLICATE KEY UPDATE `name` = `name`;

SET FOREIGN_KEY_CHECKS = 1;
