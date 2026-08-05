"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostBySlug = exports.getPosts = void 0;
const client_1 = require("@prisma/client");
const indexnow_1 = require("../lib/indexnow");
const prisma = new client_1.PrismaClient();
const SITE_URL = process.env.SITE_URL || 'https://browsergames100.com';
const getPosts = async (req, res) => {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { publishedAt: 'desc' },
            include: { category: true }
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
exports.getPosts = getPosts;
const getPostBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: { category: true }
        });
        if (!post)
            return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};
exports.getPostBySlug = getPostBySlug;
const createPost = async (req, res) => {
    try {
        const data = { ...req.body };
        if (!data.categoryId)
            delete data.categoryId;
        if (!data.id)
            delete data.id;
        if (data.content) {
            const words = data.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            data.readingTime = `${Math.ceil(words / 200)} min`;
        }
        const post = await prisma.blogPost.create({ data });
        if (post.isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${post.slug}`);
        }
        res.status(201).json(post);
    }
    catch (error) {
        console.error('Error creating blog post in MySQL:', error);
        res.status(500).json({ error: 'Failed to create post in database' });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = { ...req.body };
        delete data.id;
        if (!data.categoryId)
            delete data.categoryId;
        if (data.content) {
            const words = data.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
            data.readingTime = `${Math.ceil(words / 200)} min`;
        }
        const post = await prisma.blogPost.update({ where: { id }, data });
        if (post.isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${post.slug}`);
        }
        res.json(post);
    }
    catch (error) {
        console.error('Error updating blog post in MySQL:', error);
        res.status(500).json({ error: 'Failed to update post in database' });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prisma.blogPost.findUnique({ where: { id } });
        await prisma.blogPost.delete({ where: { id } });
        if (post && post.isPublished) {
            await (0, indexnow_1.submitToIndexNow)(`${SITE_URL}/blog/${post.slug}`);
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting blog post in MySQL:', error);
        res.status(500).json({ error: 'Failed to delete post from database' });
    }
};
exports.deletePost = deletePost;
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getCategories = getCategories;
