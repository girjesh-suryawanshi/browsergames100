import { Router } from 'express';
import { toggleFavorite, getFavorites } from '../controllers/favoriteController';

const router = Router();

router.get('/', getFavorites);
router.post('/toggle', toggleFavorite);

export default router;
