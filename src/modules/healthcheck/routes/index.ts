import type { FastifyPluginCallback } from 'fastify';
import { healthCheckModule } from './health.ts';

const fn: FastifyPluginCallback = (fastify, options, done) => {
  healthCheckModule(fastify);

  done();
};

export default fn;
