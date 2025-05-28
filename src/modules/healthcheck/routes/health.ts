import type { FastifyPluginCallback } from 'fastify';
import { DiskSpaceCheck, HealthChecks, MemoryHeapCheck } from '@adonisjs/health';
import { DbCheck } from '../../../infrastructure/db/health/DbCheck.ts';
import { DbConnectionCountCheck } from '../../../infrastructure/db/health/DbConnectionCountCheck.ts';
import { orm } from '../../../infrastructure/db/db.ts';

const fn: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get('/', async function checkHealth () {
    const healthChecks = new HealthChecks().register([
      new DiskSpaceCheck(),
      new MemoryHeapCheck(),
      new DbCheck(orm.em),
      new DbConnectionCountCheck(orm.em)
    ]);

    const report = await healthChecks.run();

    return { report };
  });

  done();
};

export default fn;
