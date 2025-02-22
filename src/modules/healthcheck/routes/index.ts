import type { FastifyPluginCallback } from 'fastify';
import health from './health.ts';

const fn: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(health);

  done();
};

export default fn;
