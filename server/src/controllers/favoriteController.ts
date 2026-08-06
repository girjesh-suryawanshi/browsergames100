import { Request, Response } from 'express';
import { pool } from '../lib/db';
import crypto from 'crypto';

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { userId = 'anonymous', gameId, gameSlug } = req.body;
    const numericGameId = parseInt(gameId, 10);

    if (isNaN(numericGameId) || !gameSlug) {
      return res.status(400).json({ error: 'Invalid gameId or gameSlug' });
    }

    const [rows]: any = await pool.query(
      'SELECT * FROM UserFavorite WHERE userId = ? AND gameId = ?',
      [userId, numericGameId]
    );

    if (rows.length > 0) {
      await pool.query('DELETE FROM UserFavorite WHERE id = ?', [rows[0].id]);
      return res.json({ isFavorite: false });
    } else {
      const id = crypto.randomUUID();
      await pool.query(
        'INSERT INTO UserFavorite (id, userId, gameId, gameSlug) VALUES (?, ?, ?, ?)',
        [id, userId, numericGameId, gameSlug]
      );
      return res.json({ isFavorite: true });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return res.status(500).json({ error: 'Failed to toggle favorite' });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'anonymous';
    const [favorites]: any = await pool.query(
      'SELECT * FROM UserFavorite WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );

    return res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};
