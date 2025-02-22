import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';
import { setTimeout } from 'node:timers/promises';

interface GetCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<GetCarPluginOptions> = (
  fastify,
  options,
  done
) => {
  fastify.get('/:car_id', async function (req, res) {
    await setTimeout(10000);
    return '';
  });
  done();
};

export default fp(fn);
