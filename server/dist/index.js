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
        break;
    }
}
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
