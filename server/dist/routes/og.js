"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const SITE_URL = process.env.SITE_URL || 'https://browsergames100.com';
// ─── Bot detection ─────────────────────────────────────────
function isSocialBot(userAgent) {
    const bots = [
        'whatsapp', 'facebookexternalhit', 'facebot', 'twitterbot',
        'telegrambot', 'linkedinbot', 'slackbot', 'discordbot',
        'pinterest', 'googlebot', 'bingbot', 'applebot', 'redditbot',
        'vkshare', 'w3c_validator', 'curl', 'python', 'axios',
        'preview', 'link preview', 'iframely', 'embedly'
    ];
    return bots.some(bot => userAgent.toLowerCase().includes(bot));
}
// ─── Read game data from local JSON ────────────────────────
function getGameData(slug, publicDir) {
    try {
        const slugMapPath = path_1.default.join(publicDir, 'data', 'slug-map.json');
        if (!fs_1.default.existsSync(slugMapPath))
            return null;
        const slugMap = JSON.parse(fs_1.default.readFileSync(slugMapPath, 'utf-8'));
        const gameId = slugMap[slug];
        if (!gameId)
            return null;
        const detailIndexPath = path_1.default.join(publicDir, 'data', 'detail-index.json');
        if (!fs_1.default.existsSync(detailIndexPath))
            return null;
        const detailIndex = JSON.parse(fs_1.default.readFileSync(detailIndexPath, 'utf-8'));
        const chunkNum = detailIndex[gameId];
        if (chunkNum === undefined)
            return null;
        const detailsPath = path_1.default.join(publicDir, 'data', `details-${chunkNum}.json`);
        if (!fs_1.default.existsSync(detailsPath))
            return null;
        const details = JSON.parse(fs_1.default.readFileSync(detailsPath, 'utf-8'));
        const game = details[gameId];
        if (!game)
            return null;
        const cleanDesc = (game.d || '').replace(/<[^>]+>/g, '').trim().slice(0, 200);
        return {
            title: game.t || slug,
            description: cleanDesc || `Play ${game.t || slug} unblocked for free online. No download needed. Works on Chromebooks.`,
            image: game.img || ''
        };
    }
    catch {
        return null;
    }
}
// ─── Image Proxy Endpoint ──────────────────────────────────
// WhatsApp needs to fetch the og:image. If CDN blocks hotlinking,
// we proxy the image through our own server.
router.get('/img', async (req, res) => {
    const rawUrl = req.query.url;
    if (!rawUrl) {
        res.status(400).send('Missing url param');
        return;
    }
    let targetUrl;
    try {
        targetUrl = new URL(rawUrl);
    }
    catch {
        res.status(400).send('Invalid URL');
        return;
    }
    try {
        const response = await fetch(targetUrl.href, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BrowserGames100/1.0)',
                'Referer': 'https://html5.gamemonetize.co/',
                'Accept': 'image/*,*/*;q=0.8'
            }
        });
        if (!response.ok) {
            res.status(response.status).send('Failed to fetch image from CDN');
            return;
        }
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        // Convert WebStream to Node Stream
        if (response.body) {
            const reader = response.body.getReader();
            const pump = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done)
                        break;
                    res.write(value);
                }
                res.end();
            };
            pump().catch(err => {
                console.error('Stream error:', err);
                res.end();
            });
        }
        else {
            res.end();
        }
    }
    catch (err) {
        console.error('Image proxy error:', err);
        res.status(502).send('Failed to fetch image');
    }
});
// ─── OG Preview HTML builder ────────────────────────────────
function buildOGHtml(slug, gameData) {
    const title = gameData
        ? `Play ${gameData.title} Unblocked — Free Online Game`
        : 'BrowserGames100 — Play Free Unblocked Games';
    const description = gameData
        ? `${gameData.description.slice(0, 160)}...`
        : 'Play thousands of free unblocked games. No download needed. Works on Chromebooks.';
    const pageUrl = `${SITE_URL}/game/${slug}`;
    // Proxy the CDN image through our server so bots can always access it
    const rawImageUrl = gameData?.image || '';
    const proxiedImage = rawImageUrl
        ? `${SITE_URL}/api/og/img?url=${encodeURIComponent(rawImageUrl)}`
        : `${SITE_URL}/og-image.png`;
    // WhatsApp specifically needs og:image:secure_url for HTTPS images
    return `<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />

  <!-- Open Graph (WhatsApp, Facebook, Telegram, Discord) -->
  <meta property="og:type"              content="website" />
  <meta property="fb:app_id"            content="850381667086827" />
  <meta property="og:site_name"         content="BrowserGames100" />
  <meta property="og:url"               content="${pageUrl}" />
  <meta property="og:title"             content="${title}" />
  <meta property="og:description"       content="${description}" />
  <meta property="og:image"             content="${proxiedImage}" />
  <meta property="og:image:secure_url"  content="${proxiedImage}" />
  <meta property="og:image:type"        content="image/jpeg" />
  <meta property="og:image:width"       content="1200" />
  <meta property="og:image:height"      content="630" />
  <meta property="og:image:alt"         content="${title}" />

  <!-- Twitter Card (large image format = image on top) -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:site"        content="@BrowserGames100" />
  <meta name="twitter:title"       content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image"       content="${proxiedImage}" />
  <meta name="twitter:image:alt"   content="${title}" />

  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <a href="${pageUrl}">
    <img src="${proxiedImage}" alt="${title}" width="1200" height="630" />
    <h1>${title}</h1>
    <p>${description}</p>
    <p>${pageUrl}</p>
  </a>
</body>
</html>`;
}
// ─── Main OG Route: /api/og/game/:slug ─────────────────────
// Called by Nginx for ALL /game/:slug requests from social bots
router.get('/game/:slug', (req, res) => {
    const slug = req.params.slug;
    // In Docker, process.cwd() is /app. We will mount the data directory to /app/public/data.
    // Locally, process.cwd() is the server directory, so we go up one level.
    const isDocker = process.env.NODE_ENV === 'production' || fs_1.default.existsSync('/.dockerenv');
    const publicDir = isDocker
        ? path_1.default.join(process.cwd(), 'public')
        : path_1.default.join(process.cwd(), '../public');
    const gameData = getGameData(slug, publicDir);
    const html = buildOGHtml(slug, gameData);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);
});
exports.default = router;
