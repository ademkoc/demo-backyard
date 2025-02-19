import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';

interface RentCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<RentCarPluginOptions> = (
  fastify,
  options,
  done
) => {
  fastify.patch('/rent', async function (req, res) {});
  done();
};

export default fp(fn);
