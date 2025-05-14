import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';
import type { RentNewFormBody } from '../../../api-types.ts';

interface RentCarRouteOptions {
  carService: CarService;
}

export function rentCarRoute (fastify: FastifyInstance, options: RentCarRouteOptions) {
  fastify.route<{ Body: RentNewFormBody }>(
    {
      method: 'PATCH',
      url: '/rent',
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/rent-new-form.json' }
      },
      handler: async function rentCarRouteHandler (req, res) {
        const { carService } = options;
        return {
          data: await carService.rent(req.body)
        };
      }
    }
  );
}
