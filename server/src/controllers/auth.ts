import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();
    let user = await prisma.user.findUnique({ where: { email: cleanEmail } });

    // Auto-sync default admin user if logging in with default admin credentials
    const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@browsergames100.com').trim().toLowerCase();
    const defaultAdminPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();

    if (cleanEmail === defaultAdminEmail && cleanPassword === defaultAdminPass) {
      const hashedPassword = await bcrypt.hash(defaultAdminPass, 10);
      user = await prisma.user.upsert({
        where: { email: defaultAdminEmail },
        update: {
          password: hashedPassword,
          role: 'ADMIN'
        },
        create: {
          email: defaultAdminEmail,
          password: hashedPassword,
          fullName: 'BrowserGames100 Admin',
          role: 'ADMIN'
        }
      });
    }

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
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: 'Administrator',
        role: 'ADMIN'
      }
    });
    
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
};
