import { Request, Response } from 'express';
import { pool } from '../lib/db';
import crypto from 'crypto';

export const submitGame = async (req: Request, res: Response) => {
  try {
    const { title, url, email, notes } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO GameSubmission (id, title, url, email, notes) VALUES (?, ?, ?, ?, ?)',
      [id, title, url, email || null, notes || null]
    );

    return res.status(201).json({ success: true, submission: { id, title, url, email, notes } });
  } catch (error) {
    console.error('Error submitting game:', error);
    return res.status(500).json({ error: 'Failed to save game submission' });
  }
};

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO ContactMessage (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, subject || null, message]
    );

    return res.status(201).json({ success: true, contact: { id, name, email, subject, message } });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return res.status(500).json({ error: 'Failed to save contact message' });
  }
};

export const getSubmissions = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM GameSubmission ORDER BY createdAt DESC');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch game submissions' });
  }
};

export const getContactMessages = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT * FROM ContactMessage ORDER BY createdAt DESC');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};
