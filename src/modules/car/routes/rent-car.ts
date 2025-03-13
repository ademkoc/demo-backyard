import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface RentCarRouteOptions {
  carService: CarService;
}

export function rentCarRoute (fastify: FastifyInstance, opts: RentCarRouteOptions) {
  fastify.route(
    {
      method: 'PATCH',
      url: '/rent',
      handler: async function rentCarRouteHandler (req, res) {}
    }
  );
}
