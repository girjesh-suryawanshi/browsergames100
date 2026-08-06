import { Request, Response } from 'express';
import { pool, syncAdminUser } from '../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@browsergames100.com').trim().toLowerCase();
    const defaultAdminPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();

    // Auto-sync default admin if logging in with default credentials
    if (cleanEmail === defaultAdminEmail && cleanPassword === defaultAdminPass) {
      await syncAdminUser(defaultAdminEmail, defaultAdminPass);
    }

    const [rows]: any = await pool.query('SELECT * FROM User WHERE email = ?', [cleanEmail]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(cleanPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userRole = (user.role || '').toUpperCase();
    if (userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied: Admin role required' });
    }

    const secret = process.env.JWT_SECRET || 'deergh121454sdsdsd45dd4d545adad';
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
    console.error('Login controller error:', error);
    return res.status(500).json({ error: 'Server error during login', message: error?.message || String(error) });
  }
};

export const setupAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await syncAdminUser(email || 'admin@browsergames100.com', password || 'admin123');
    return res.json({ success: true, message: 'Admin synchronized' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to setup admin' });
  }
};
