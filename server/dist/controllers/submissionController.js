"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactMessages = exports.getSubmissions = exports.submitContact = exports.submitGame = void 0;
const db_1 = require("../lib/db");
const crypto_1 = __importDefault(require("crypto"));
const submitGame = async (req, res) => {
    try {
        const { title, url, email, notes } = req.body;
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }
        const id = crypto_1.default.randomUUID();
        await db_1.pool.query('INSERT INTO GameSubmission (id, title, url, email, notes) VALUES (?, ?, ?, ?, ?)', [id, title, url, email || null, notes || null]);
        return res.status(201).json({ success: true, submission: { id, title, url, email, notes } });
    }
    catch (error) {
        console.error('Error submitting game:', error);
        return res.status(500).json({ error: 'Failed to save game submission' });
    }
};
exports.submitGame = submitGame;
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }
        const id = crypto_1.default.randomUUID();
        await db_1.pool.query('INSERT INTO ContactMessage (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)', [id, name, email, subject || null, message]);
        return res.status(201).json({ success: true, contact: { id, name, email, subject, message } });
    }
    catch (error) {
        console.error('Error submitting contact message:', error);
        return res.status(500).json({ error: 'Failed to save contact message' });
    }
};
exports.submitContact = submitContact;
const getSubmissions = async (_req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM GameSubmission ORDER BY createdAt DESC');
        return res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch game submissions' });
    }
};
exports.getSubmissions = getSubmissions;
const getContactMessages = async (_req, res) => {
    try {
        const [rows] = await db_1.pool.query('SELECT * FROM ContactMessage ORDER BY createdAt DESC');
        return res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
};
exports.getContactMessages = getContactMessages;
