import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface GetCarRouteOptions {
  carService: CarService;
}

export function getCarRoute (fastify: FastifyInstance, opts: GetCarRouteOptions) {
  fastify.route(
    {
      method: 'GET',
      url: '/:car_id',
      handler: async function getCarRouteHandler (req, res) {
        return 'adem:koc';
      }
    }
  );
}
