import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';
import { CarNewFormBody } from '../../../api-types.ts';

interface CreateCarPluginOptions {
  carService: CarService;
}

export function applyCreateCarRoute (fastify: FastifyInstance, opts: CreateCarPluginOptions) {
  fastify.route<{ Body: CarNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
      },
      handler: async function createCar (req, res) {}
    }
  );
}
