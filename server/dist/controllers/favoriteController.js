"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.toggleFavorite = void 0;
const prisma_1 = require("../lib/prisma");
const toggleFavorite = async (req, res) => {
    try {
        const { userId = 'anonymous', gameId, gameSlug } = req.body;
        const numericGameId = parseInt(gameId, 10);
        if (isNaN(numericGameId) || !gameSlug) {
            return res.status(400).json({ error: 'Invalid gameId or gameSlug' });
        }
        const existing = await prisma_1.prisma.userFavorite.findUnique({
            where: {
                userId_gameId: {
                    userId,
                    gameId: numericGameId
                }
            }
        });
        if (existing) {
            await prisma_1.prisma.userFavorite.delete({
                where: { id: existing.id }
            });
            return res.json({ isFavorite: false });
        }
        else {
            await prisma_1.prisma.userFavorite.create({
                data: {
                    userId,
                    gameId: numericGameId,
                    gameSlug
                }
            });
            return res.json({ isFavorite: true });
        }
    }
    catch (error) {
        console.error('Error toggling favorite:', error);
        return res.status(500).json({ error: 'Failed to toggle favorite' });
    }
};
exports.toggleFavorite = toggleFavorite;
const getFavorites = async (req, res) => {
    try {
        const userId = req.query.userId || 'anonymous';
        const favorites = await prisma_1.prisma.userFavorite.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return res.json(favorites);
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        return res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};
exports.getFavorites = getFavorites;
