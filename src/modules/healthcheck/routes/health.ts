import type { FastifyInstance } from 'fastify';
import { DiskSpaceCheck, HealthChecks, MemoryHeapCheck } from '@adonisjs/health';
import { DbCheck } from '../../../infrastructure/db/health/DbCheck.ts';
import { DbConnectionCountCheck } from '../../../infrastructure/db/health/DbConnectionCountCheck.ts';

export function healthCheckModule (fastify:FastifyInstance) {
  fastify.get('/', async function checkHealth (req, res) {
    const healthChecks = new HealthChecks().register([
      new DiskSpaceCheck(),
      new MemoryHeapCheck(),
      new DbCheck(fastify.db.em),
      new DbConnectionCountCheck(fastify.db.em)
    ]);

    const report = await healthChecks.run();

    return { report };
  });
}
