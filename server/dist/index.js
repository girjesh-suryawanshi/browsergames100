"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const blog_1 = __importDefault(require("./routes/blog"));
const auth_1 = __importDefault(require("./routes/auth"));
const upload_1 = __importDefault(require("./routes/upload"));
const og_1 = __importDefault(require("./routes/og"));
const seo_1 = __importDefault(require("./routes/seo"));
const gameStats_1 = __importDefault(require("./routes/gameStats"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const submissions_1 = __importDefault(require("./routes/submissions"));
const prisma_1 = require("./lib/prisma");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Process error handlers to prevent silent crashes on Hostinger
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
// Serve uploaded images from the persistent volume
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// Serve static game data catalog (/data)
const dataDirs = [
    path_1.default.join(process.cwd(), 'public/data'),
    path_1.default.join(process.cwd(), 'dist/data'),
    path_1.default.join(__dirname, '../../public/data'),
    path_1.default.join(__dirname, '../public/data')
];
for (const dir of dataDirs) {
    if (fs_1.default.existsSync(dir)) {
        app.use('/data', express_1.default.static(dir));
    }
}
// Fallback explicit route for game data catalog files
app.get('/data/:filename', (req, res, next) => {
    const filename = req.params.filename;
    for (const dir of dataDirs) {
        const filePath = path_1.default.join(dir, filename);
        if (fs_1.default.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }
    next();
});
// Serve root public folder if present
const publicDirs = [
    path_1.default.join(process.cwd(), 'public'),
    path_1.default.join(__dirname, '../../public'),
    path_1.default.join(__dirname, '../public')
];
for (const dir of publicDirs) {
    if (fs_1.default.existsSync(dir)) {
        app.use(express_1.default.static(dir));
    }
}
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function autoSeed() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@browsergames100.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const existingAdmin = await prisma_1.prisma.user.findUnique({ where: { email: adminEmail } });
        if (!existingAdmin) {
            const hashedPassword = await bcryptjs_1.default.hash(adminPassword, 10);
            await prisma_1.prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    fullName: 'BrowserGames100 Admin',
                    role: 'ADMIN',
                },
            });
            console.log(`✅ Auto-seeded admin user: ${adminEmail}`);
        }
        const defaultCategories = [
            { name: 'Game Guides', description: 'In-depth strategy guides and walkthroughs for popular unblocked games.' },
            { name: 'Top Picks', description: 'Curated roundups and top 10 lists of the best browser games.' },
            { name: 'Unblocked Picks', description: 'Games tested and verified to run on school Chromebooks and restricted networks.' },
            { name: 'Game Updates', description: 'Latest news, balance updates, and patch notes for browser games.' },
        ];
        for (const cat of defaultCategories) {
            await prisma_1.prisma.category.upsert({
                where: { name: cat.name },
                update: {},
                create: cat,
            });
        }
    }
    catch (err) {
        console.warn('Auto-seed skipped (database tables will be initialized on first write):', err);
    }
}
autoSeed();
// Health & Database Connection Check Route
app.get('/api/health', async (req, res) => {
    try {
        await prisma_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error?.message || String(error),
            timestamp: new Date().toISOString()
        });
    }
});
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/blog', blog_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/games', gameStats_1.default);
app.use('/api/favorites', favorites_1.default);
app.use('/api/submissions', submissions_1.default);
// OG tag proxy for social media bots
app.use('/api/og', og_1.default);
// SEO endpoints: blog sitemap + RSS feed
app.use('/', seo_1.default);
// Serve compiled React frontend (dist) if hosted together with Node.js
const distDirs = [
    path_1.default.join(process.cwd(), 'dist'),
    path_1.default.join(__dirname, '../../dist'),
    path_1.default.join(__dirname, '../dist')
];
let foundDistDir = null;
for (const dir of distDirs) {
    if (fs_1.default.existsSync(dir) && fs_1.default.existsSync(path_1.default.join(dir, 'index.html'))) {
        foundDistDir = dir;
        break;
    }
}
if (foundDistDir) {
    app.use(express_1.default.static(foundDistDir));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path.includes('.')) {
            return next();
        }
        res.sendFile(path_1.default.join(foundDistDir, 'index.html'));
    });
}
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on ${port}`);
});
