import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';

interface GetCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<GetCarPluginOptions> = (
  fastify,
  options,
  done
) => {
  fastify.get('/:car_id', async function (req, res) {});
  done();
};

export default fp(fn);
