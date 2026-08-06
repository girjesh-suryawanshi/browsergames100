import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const recordPlay = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { gameId } = req.body;

    const numericGameId = parseInt(gameId, 10);
    if (!slug || isNaN(numericGameId)) {
      return res.status(400).json({ error: 'Invalid slug or gameId' });
    }

    const stat = await prisma.gameStat.upsert({
      where: { gameId: numericGameId },
      update: {
        playCount: { increment: 1 }
      },
      create: {
        gameId: numericGameId,
        slug,
        playCount: 1,
        likeCount: 0,
        dislikeCount: 0
      }
    });

    return res.json({ success: true, stat });
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
    const stat = await prisma.gameStat.upsert({
      where: { gameId: numericGameId },
      update: isLike
        ? { likeCount: { increment: 1 } }
        : { dislikeCount: { increment: 1 } },
      create: {
        gameId: numericGameId,
        slug,
        playCount: 0,
        likeCount: isLike ? 1 : 0,
        dislikeCount: isLike ? 0 : 1
      }
    });

    return res.json({ success: true, stat });
  } catch (error) {
    console.error('Error rating game:', error);
    return res.status(500).json({ error: 'Failed to record rating' });
  }
};

export const getGameStats = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const stat = await prisma.gameStat.findUnique({
      where: { slug }
    });

    if (!stat) {
      return res.json({ playCount: 0, likeCount: 0, dislikeCount: 0 });
    }

    return res.json(stat);
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return res.status(500).json({ error: 'Failed to fetch game stats' });
  }
};

export const getTopAnalytics = async (_req: Request, res: Response) => {
  try {
    const topPlayed = await prisma.gameStat.findMany({
      orderBy: { playCount: 'desc' },
      take: 20
    });
    const totals = await prisma.gameStat.aggregate({
      _sum: { playCount: true, likeCount: true, dislikeCount: true }
    });
    return res.json({
      topPlayed,
      totalPlays: totals._sum.playCount || 0,
      totalLikes: totals._sum.likeCount || 0,
      totalDislikes: totals._sum.dislikeCount || 0
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics summary' });
  }
};
