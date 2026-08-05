import { Router } from 'express';
import { recordPlay, rateGame, getGameStats } from '../controllers/gameStatController';

const router = Router();

router.get('/:slug/stats', getGameStats);
router.post('/:slug/play', recordPlay);
router.post('/:slug/rate', rateGame);

export default router;
