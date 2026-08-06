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
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error during login' });
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
