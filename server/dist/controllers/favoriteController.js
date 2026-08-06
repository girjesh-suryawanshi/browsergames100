"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.toggleFavorite = void 0;
const db_1 = require("../lib/db");
const crypto_1 = __importDefault(require("crypto"));
const toggleFavorite = async (req, res) => {
    try {
        const { userId = 'anonymous', gameId, gameSlug } = req.body;
        const numericGameId = parseInt(gameId, 10);
        if (isNaN(numericGameId) || !gameSlug) {
            return res.status(400).json({ error: 'Invalid gameId or gameSlug' });
        }
        const [rows] = await db_1.pool.query('SELECT * FROM UserFavorite WHERE userId = ? AND gameId = ?', [userId, numericGameId]);
        if (rows.length > 0) {
            await db_1.pool.query('DELETE FROM UserFavorite WHERE id = ?', [rows[0].id]);
            return res.json({ isFavorite: false });
        }
        else {
            const id = crypto_1.default.randomUUID();
            await db_1.pool.query('INSERT INTO UserFavorite (id, userId, gameId, gameSlug) VALUES (?, ?, ?, ?)', [id, userId, numericGameId, gameSlug]);
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
        const [favorites] = await db_1.pool.query('SELECT * FROM UserFavorite WHERE userId = ? ORDER BY createdAt DESC', [userId]);
        return res.json(favorites);
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        return res.status(500).json({ error: 'Failed to fetch favorites' });
    }
};
exports.getFavorites = getFavorites;
