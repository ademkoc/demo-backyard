import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface ListCarPluginOptions {
  carService: CarService;
}

export function applyListCarRoute (fastify:FastifyInstance, opts: ListCarPluginOptions) {
  fastify.route(
    {
      method: 'GET',
      url: '/',
      handler: async function listCar (req, res) {}
    }
  );
}
