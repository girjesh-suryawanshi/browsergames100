"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'binary';
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: ['warn', 'error']
});
