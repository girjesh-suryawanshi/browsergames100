import { Router } from 'express';
import { submitGame, submitContact, getSubmissions, getContactMessages } from '../controllers/submissionController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// Public submission endpoints
router.post('/game', submitGame);
router.post('/contact', submitContact);

// Admin protected endpoints
router.get('/game', requireAdmin, getSubmissions);
router.get('/contact', requireAdmin, getContactMessages);

export default router;
