"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopAnalytics = exports.getGameStats = exports.rateGame = exports.recordPlay = void 0;
const db_1 = require("../lib/db");
const crypto_1 = __importDefault(require("crypto"));
const recordPlay = async (req, res) => {
    try {
        const { slug } = req.params;
        const { gameId } = req.body;
        const numericGameId = parseInt(gameId, 10);
        if (!slug || isNaN(numericGameId)) {
            return res.status(400).json({ error: 'Invalid slug or gameId' });
        }
        const id = crypto_1.default.randomUUID();
        await db_1.pool.query(`INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
       VALUES (?, ?, ?, 1, 0, 0)
       ON DUPLICATE KEY UPDATE playCount = playCount + 1`, [id, numericGameId, slug]);
        const [rows] = await db_1.pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);
        return res.json({ success: true, stat: rows[0] });
    }
    catch (error) {
        console.error('Error recording play:', error);
        return res.status(500).json({ error: 'Failed to record play count' });
    }
};
exports.recordPlay = recordPlay;
const rateGame = async (req, res) => {
    try {
        const { slug } = req.params;
        const { gameId, type } = req.body; // type: 'like' | 'dislike'
        const numericGameId = parseInt(gameId, 10);
        if (!slug || isNaN(numericGameId) || !['like', 'dislike'].includes(type)) {
            return res.status(400).json({ error: 'Invalid parameters for rating' });
        }
        const isLike = type === 'like';
        const id = crypto_1.default.randomUUID();
        if (isLike) {
            await db_1.pool.query(`INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
         VALUES (?, ?, ?, 0, 1, 0)
         ON DUPLICATE KEY UPDATE likeCount = likeCount + 1`, [id, numericGameId, slug]);
        }
        else {
            await db_1.pool.query(`INSERT INTO GameStat (id, gameId, slug, playCount, likeCount, dislikeCount)
         VALUES (?, ?, ?, 0, 0, 1)
         ON DUPLICATE KEY UPDATE dislikeCount = dislikeCount + 1`, [id, numericGameId, slug]);
        }
        const [rows] = await db_1.pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);
        return res.json({ success: true, stat: rows[0] });
    }
    catch (error) {
        console.error('Error rating game:', error);
        return res.status(500).json({ error: 'Failed to record rating' });
    }
};
exports.rateGame = rateGame;
const getGameStats = async (req, res) => {
    try {
        const { slug } = req.params;
        const [rows] = await db_1.pool.query('SELECT * FROM GameStat WHERE slug = ?', [slug]);
        if (rows.length === 0) {
            return res.json({ playCount: 0, likeCount: 0, dislikeCount: 0 });
        }
        return res.json(rows[0]);
    }
    catch (error) {
        console.error('Error fetching game stats:', error);
        return res.status(500).json({ error: 'Failed to fetch game stats' });
    }
};
exports.getGameStats = getGameStats;
const getTopAnalytics = async (_req, res) => {
    try {
        const [topPlayed] = await db_1.pool.query('SELECT * FROM GameStat ORDER BY playCount DESC LIMIT 20');
        const [totals] = await db_1.pool.query('SELECT SUM(playCount) as totalPlays, SUM(likeCount) as totalLikes, SUM(dislikeCount) as totalDislikes FROM GameStat');
        const stats = totals[0] || {};
        return res.json({
            topPlayed,
            totalPlays: Number(stats.totalPlays || 0),
            totalLikes: Number(stats.totalLikes || 0),
            totalDislikes: Number(stats.totalDislikes || 0)
        });
    }
    catch (error) {
        console.error('Error fetching analytics summary:', error);
        return res.status(500).json({ error: 'Failed to fetch analytics summary' });
    }
};
exports.getTopAnalytics = getTopAnalytics;
