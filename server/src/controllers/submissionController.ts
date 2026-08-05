import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const submitGame = async (req: Request, res: Response) => {
  try {
    const { title, url, email, notes } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const submission = await prisma.gameSubmission.create({
      data: { title, url, email, notes }
    });

    return res.status(201).json({ success: true, submission });
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

    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    return res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return res.status(500).json({ error: 'Failed to save contact message' });
  }
};

export const getSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await prisma.gameSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(submissions);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch game submissions' });
  }
};

export const getContactMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
};
