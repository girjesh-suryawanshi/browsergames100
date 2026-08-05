"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded.role !== 'ADMIN') {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
            return;
        }
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.requireAdmin = requireAdmin;
