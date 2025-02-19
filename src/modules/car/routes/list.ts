import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';

interface ListCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<ListCarPluginOptions> = (
  fastify,
  options,
  done
) => {
  fastify.get('/', async function (req, res) {});
  done();
};

export default fp(fn);
