import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';

const fn: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.get('/', function (req, res) {
    return { status: 'ok' };
  });
  done();
};

export default fp(fn);
