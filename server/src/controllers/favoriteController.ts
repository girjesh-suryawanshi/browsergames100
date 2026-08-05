import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const { userId = 'anonymous', gameId, gameSlug } = req.body;
    const numericGameId = parseInt(gameId, 10);

    if (isNaN(numericGameId) || !gameSlug) {
      return res.status(400).json({ error: 'Invalid gameId or gameSlug' });
    }

    const existing = await prisma.userFavorite.findUnique({
      where: {
        userId_gameId: {
          userId,
          gameId: numericGameId
        }
      }
    });

    if (existing) {
      await prisma.userFavorite.delete({
        where: { id: existing.id }
      });
      return res.json({ isFavorite: false });
    } else {
      await prisma.userFavorite.create({
        data: {
          userId,
          gameId: numericGameId,
          gameSlug
        }
      });
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
    const favorites = await prisma.userFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};
