import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';
import type { CarNewFormBody } from '../../../api-types.ts';

interface CreateCarRouteOptions {
  carService: CarService;
}

export function createCarRoute (fastify: FastifyInstance, opts: CreateCarRouteOptions) {
  fastify.route<{ Body: CarNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/car-new-form.json' }
      },
      handler: async function createCarRouteHandler (req, res) {
        const { carService } = opts;
        return {
          data: await carService.create(req.body)
        };
      }
    }
  );
}
