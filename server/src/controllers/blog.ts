import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { submitToIndexNow } from '../lib/indexnow';
import crypto from 'crypto';

const SITE_URL = process.env.SITE_URL || 'https://browsergames100.com';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM BlogPost ORDER BY publishedAt DESC');
    return res.json(rows);
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts', message: error?.message || String(error) });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const [rows]: any = await pool.query('SELECT * FROM BlogPost WHERE slug = ?', [slug]);
    const post = rows[0];
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const id = data.id || crypto.randomUUID();
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

    await pool.query(
      `INSERT INTO BlogPost (id, title, slug, content, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, slug, content, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription]
    );

    const [rows]: any = await pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
    const createdPost = rows[0];

    if (isPublished) {
      await submitToIndexNow(`${SITE_URL}/blog/${slug}`);
    }

    return res.status(201).json(createdPost);
  } catch (error: any) {
    console.error('Error creating blog post in MySQL:', error);
    return res.status(500).json({ error: 'Failed to create post in database', message: error?.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
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

    await pool.query(
      `UPDATE BlogPost 
       SET title = ?, slug = ?, content = ?, excerpt = ?, readingTime = ?, isPublished = ?, isFeatured = ?, coverImage = ?, seoTitle = ?, seoDescription = ?
       WHERE id = ?`,
      [title, slug, content, excerpt, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription, id]
    );

    const [rows]: any = await pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
    const updatedPost = rows[0];

    if (isPublished) {
      await submitToIndexNow(`${SITE_URL}/blog/${slug}`);
    }

    return res.json(updatedPost);
  } catch (error: any) {
    console.error('Error updating blog post in MySQL:', error);
    return res.status(500).json({ error: 'Failed to update post in database', message: error?.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const [rows]: any = await pool.query('SELECT * FROM BlogPost WHERE id = ?', [id]);
    const post = rows[0];

    await pool.query('DELETE FROM BlogPost WHERE id = ?', [id]);

    if (post && post.isPublished) {
      await submitToIndexNow(`${SITE_URL}/blog/${post.slug}`);
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post in MySQL:', error);
    return res.status(500).json({ error: 'Failed to delete post from database' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM Category ORDER BY name ASC');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
