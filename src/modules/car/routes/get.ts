import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface GetCarPluginOptions {
  carService: CarService;
}

export function applyGetCarRoute (fastify: FastifyInstance, opts: GetCarPluginOptions) {
  fastify.route(
    {
      method: 'GET',
      url: '/:car_id',
      handler: async function getCar (req, res) {
        return 'adem:koc';
      }
    }
  );
}
