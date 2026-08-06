"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdmin = exports.login = void 0;
const prisma_1 = require("../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const cleanEmail = String(email).trim().toLowerCase();
        const cleanPassword = String(password).trim();
        let user = await prisma_1.prisma.user.findUnique({ where: { email: cleanEmail } });
        // Auto-sync default admin user if logging in with default admin credentials
        const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'admin@browsergames100.com').trim().toLowerCase();
        const defaultAdminPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();
        if (cleanEmail === defaultAdminEmail && cleanPassword === defaultAdminPass) {
            const hashedPassword = await bcryptjs_1.default.hash(defaultAdminPass, 10);
            user = await prisma_1.prisma.user.upsert({
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
        const isMatch = await bcryptjs_1.default.compare(cleanPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const userRole = (user.role || '').toUpperCase();
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ error: 'Access denied: Admin role required' });
        }
        const secret = process.env.JWT_SECRET || 'deergh121454sdsdsd45dd4d545adad';
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
        return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error('Login controller error:', error);
        return res.status(500).json({ error: 'Server error during login', message: error?.message || String(error) });
    }
};
exports.login = login;
const setupAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName: 'Administrator',
                role: 'ADMIN'
            }
        });
        res.status(201).json({ success: true, message: 'Admin created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
};
exports.setupAdmin = setupAdmin;
