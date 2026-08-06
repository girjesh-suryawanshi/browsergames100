import { Request, Response } from 'express';
import { pool } from '../lib/db';
import crypto from 'crypto';

export const recordPlay = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { gameId } = req.body;

    const numericGameId = parseInt(gameId, 10);
    if (!slug || isNaN(numericGameId)) {
      return res.status(400).json({ error: 'Invalid slug or gameId' });
    }

    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
       VALUES (?, ?, ?, 1, 0, 0)
       ON DUPLICATE KEY UPDATE playCount = playCount + 1`,
      [id, numericGameId, slug]
    );

    const [rows]: any = await pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);
    return res.json({ success: true, stat: rows[0] });
  } catch (error) {
    console.error('Error recording play:', error);
    return res.status(500).json({ error: 'Failed to record play count' });
  }
};

export const rateGame = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { gameId, type } = req.body; // type: 'like' | 'dislike'

    const numericGameId = parseInt(gameId, 10);
    if (!slug || isNaN(numericGameId) || !['like', 'dislike'].includes(type)) {
      return res.status(400).json({ error: 'Invalid parameters for rating' });
    }

    const isLike = type === 'like';
    const id = crypto.randomUUID();

    if (isLike) {
      await pool.query(
        `INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
         VALUES (?, ?, ?, 0, 1, 0)
         ON DUPLICATE KEY UPDATE likeCount = likeCount + 1`,
        [id, numericGameId, slug]
      );
    } else {
      await pool.query(
        `INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
         VALUES (?, ?, ?, 0, 0, 1)
         ON DUPLICATE KEY UPDATE dislikeCount = dislikeCount + 1`,
        [id, numericGameId, slug]
      );
    }

    const [rows]: any = await pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);
    return res.json({ success: true, stat: rows[0] });
  } catch (error) {
    console.error('Error rating game:', error);
    return res.status(500).json({ error: 'Failed to record rating' });
  }
};

export const getGameStats = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);

    if (rows.length === 0) {
      return res.json({ playCount: 0, likeCount: 0, dislikeCount: 0 });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return res.status(500).json({ error: 'Failed to fetch game stats' });
  }
};

export const getTopAnalytics = async (_req: Request, res: Response) => {
  try {
    const [topPlayed]: any = await pool.query('SELECT * FROM GameStat ORDER BY playCount DESC LIMIT 20');
    const [totals]: any = await pool.query(
      'SELECT SUM(playCount) as totalPlays, SUM(likeCount) as totalLikes, SUM(dislikeCount) as totalDislikes FROM GameStat'
    );

    const stats = totals[0] || {};
    return res.json({
      topPlayed,
      totalPlays: Number(stats.totalPlays || 0),
      totalLikes: Number(stats.totalLikes || 0),
      totalDislikes: Number(stats.totalDislikes || 0)
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics summary' });
  }
};
