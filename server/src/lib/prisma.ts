process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'binary';

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['warn', 'error']
});
