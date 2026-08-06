"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostBySlug = exports.getPosts = void 0;
const db_1 = require("../lib/db");
const indexnow_1 = require("../lib/indexnow");
const crypto_1 = __importDefault(require("crypto"));
const SITE_URL = process.env.SITE_URL || 'https://browsergames100.com';
const getPosts = async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM BlogPost ORDER BY publishedAt DESC');
        return res.json(rows);
    }
    catch (error) {
        console.error('Error fetching blog posts:', error);
        return res.status(500).json({ error: 'Failed to fetch posts', message: error?.message || String(error) });
    }
};
exports.getPosts = getPosts;
const getPostBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const [rows] = await db_1.pool.query('SELECT * FROM BlogPost WHERE slug = ?', [slug]);
        const post = rows[0];
        if (!post)
            return res.status(404).json({ error: 'Post not found' });
        return res.json(post);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch post' });
    }
};
exports.getPostBySlug = getPostBySlug;
const createPost = async (req, res) => {
    try {
        const data = { ...req.body };
        const id = data.id || crypto_1.default.randomUUID();
        const title = data.title;
        const slug = data.slug;
        const content = data.content || '';
        const excerpt = data.excerpt || null;
        const authorName = data.authorName || 'Admin';
        const isPublished = data.isPublished ? 1 : 0;
        const isFeatured = data.isFeatured ? 1 : 0;
        const coverImage = data.coverImage || null;
        const seoTitle = data.seoTitle || null;
        const seoDescription = data.seoDescription || null;
        let readingTime = '3 min';
        if (content) {
            const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            readingTime = `${Math.ceil(words / 200)} min`;
        }
        await db_1.pool.query(`INSERT INTO BlogPost (id, title, slug, content, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, title, slug, content, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription]);
        const [rows] = await db_1.pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
        const createdPost = rows[0];
        if (isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${slug}`);
        }
        return res.status(201).json(createdPost);
    }
    catch (error) {
        console.error('Error creating blog post in MySQL:', error);
        return res.status(500).json({ error: 'Failed to create post in database', message: error?.message });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = { ...req.body };
        const title = data.title;
        const slug = data.slug;
        const content = data.content || '';
        const excerpt = data.excerpt || null;
        const isPublished = data.isPublished ? 1 : 0;
        const isFeatured = data.isFeatured ? 1 : 0;
        const coverImage = data.coverImage || null;
        const seoTitle = data.seoTitle || null;
        const seoDescription = data.seoDescription || null;
        let readingTime = '3 min';
        if (content) {
            const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            readingTime = `${Math.ceil(words / 200)} min`;
        }
        await db_1.pool.query(`UPDATE BlogPost 
       SET title = ?, slug = ?, content = ?, excerpt = ?, readingTime = ?, isPublished = ?, isFeatured = ?, coverImage = ?, seoTitle = ?, seoDescription = ?
       WHERE id = ?`, [title, slug, content, excerpt, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription, id]);
        const [rows] = await db_1.pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
        const updatedPost = rows[0];
        if (isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${slug}`);
        }
        return res.json(updatedPost);
    }
    catch (error) {
        console.error('Error updating blog post in MySQL:', error);
        return res.status(500).json({ error: 'Failed to update post in database', message: error?.message });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db_1.pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
        const post = rows[0];
        await db_1.pool.query('DELETE FROM BlogPost WHERE id = ?', [id]);
        if (post && post.isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${post.slug}`);
        }
        return res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting blog post in MySQL:', error);
        return res.status(500).json({ error: 'Failed to delete post from database' });
    }
};
exports.deletePost = deletePost;
const getCategories = async (req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM Category ORDER BY name ASC');
        return res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getCategories = getCategories;
