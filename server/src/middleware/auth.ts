import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'deergh121454sdsdsd45dd4d545adad';

  try {
    const decoded = jwt.verify(token, secret) as { id: string, role: string };
    const userRole = (decoded.role || '').toUpperCase();
    
    if (userRole !== 'ADMIN') {
      res.status(403).json({ error: `Forbidden: Admin access required (got role ${decoded.role})` });
      return;
    }
    
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('JWT verification error:', error?.message || error);
    res.status(401).json({ error: 'Unauthorized: Invalid token', details: error?.message });
    return;
  }
};
