"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'deergh121454sdsdsd45dd4d545adad';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const userRole = (decoded.role || '').toUpperCase();
        if (userRole !== 'ADMIN') {
            res.status(403).json({ error: `Forbidden: Admin access required (got role ${decoded.role})` });
            return;
        }
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('JWT verification error:', error?.message || error);
        res.status(401).json({ error: 'Unauthorized: Invalid token', details: error?.message });
        return;
    }
};
exports.requireAdmin = requireAdmin;
