import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface RentCarPluginOptions {
  carService: CarService;
}

export function applyCarRoute (fastify: FastifyInstance, opts:RentCarPluginOptions) {
  fastify.route(
    {
      method: 'PATCH',
      url: '/rent',
      handler: async function rentCar (req, res) {}
    }
  );
}
