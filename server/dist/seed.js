"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function seed() {
    console.log('Seeding MySQL Database for BrowserGames100...');
    // 1. Ensure default Admin user exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@browsergames100.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const hashedPassword = await bcryptjs_1.default.hash(adminPassword, 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                fullName: 'BrowserGames100 Admin',
                role: 'ADMIN',
            },
        });
        console.log(`✅ Default admin created: ${adminEmail}`);
    }
    else {
        console.log(`ℹ️ Admin user ${adminEmail} already exists.`);
    }
    // 2. Ensure default categories exist
    const defaultCategories = [
        { name: 'Game Guides', description: 'In-depth strategy guides and walkthroughs for popular unblocked games.' },
        { name: 'Top Picks', description: 'Curated roundups and top 10 lists of the best browser games.' },
        { name: 'Unblocked Picks', description: 'Games tested and verified to run on school Chromebooks and restricted networks.' },
        { name: 'Game Updates', description: 'Latest news, balance updates, and patch notes for browser games.' },
    ];
    for (const cat of defaultCategories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
    }
    console.log('✅ Default categories initialized.');
    console.log('🎉 Seeding complete!');
}
seed()
    .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
