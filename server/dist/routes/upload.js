"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../middleware/auth");
const SITE_URL = process.env.SITE_URL || 'https://browsergames100.com';
const router = (0, express_1.Router)();
// Uploads go to /app/uploads which is mounted as a Docker volume.
// __dirname in compiled code = /app/dist/routes, so we use process.cwd() for reliability.
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        // sanitize original name a bit
        const safeName = path_1.default.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `${safeName}-${uniqueSuffix}${ext}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
router.post('/image', auth_1.requireAdmin, upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No image provided' });
        return;
    }
    // Return the full absolute URL so it works as an og:image for social sharing
    const imageUrl = `${SITE_URL}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});
exports.default = router;
