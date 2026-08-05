"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submissionController_1 = require("../controllers/submissionController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public submission endpoints
router.post('/game', submissionController_1.submitGame);
router.post('/contact', submissionController_1.submitContact);
// Admin protected endpoints
router.get('/game', auth_1.requireAdmin, submissionController_1.getSubmissions);
router.get('/contact', auth_1.requireAdmin, submissionController_1.getContactMessages);
exports.default = router;
