import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface ListCarRouteOptions {
  carService: CarService;
}

export function listCarRoute (fastify:FastifyInstance, opts: ListCarRouteOptions) {
  fastify.route(
    {
      method: 'GET',
      url: '/',
      handler: async function listCarRouteHandler (req, res) {}
    }
  );
}
