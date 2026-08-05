"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactMessages = exports.getSubmissions = exports.submitContact = exports.submitGame = void 0;
const prisma_1 = require("../lib/prisma");
const submitGame = async (req, res) => {
    try {
        const { title, url, email, notes } = req.body;
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }
        const submission = await prisma_1.prisma.gameSubmission.create({
            data: { title, url, email, notes }
        });
        return res.status(201).json({ success: true, submission });
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
        const contact = await prisma_1.prisma.contactMessage.create({
            data: { name, email, subject, message }
        });
        return res.status(201).json({ success: true, contact });
    }
    catch (error) {
        console.error('Error submitting contact message:', error);
        return res.status(500).json({ error: 'Failed to save contact message' });
    }
};
exports.submitContact = submitContact;
const getSubmissions = async (_req, res) => {
    try {
        const submissions = await prisma_1.prisma.gameSubmission.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return res.json(submissions);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch game submissions' });
    }
};
exports.getSubmissions = getSubmissions;
const getContactMessages = async (_req, res) => {
    try {
        const messages = await prisma_1.prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return res.json(messages);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
};
exports.getContactMessages = getContactMessages;
