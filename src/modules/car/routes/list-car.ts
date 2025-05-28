import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';
import type { Pagination } from '../../../api-types.ts';
import { Tag } from '../../../infrastructure/http/swagger.ts';

interface ListCarRouteOptions {
  carService: CarService;
}

export function listCarRoute (fastify:FastifyInstance, options: ListCarRouteOptions) {
  fastify.route<{ Querystring: Pagination }>(
    {
      method: 'GET',
      url: '/',
      schema: {
        tags: [Tag.CAR],
        querystring: { $ref: 'https://koc.app/schemas/rentacarserver/pagination.json' }
      },
      handler: async function listCarRouteHandler (req, res) {
        const { carService } = options;

        const [data, total] = await carService.get(req.query);

        return {
          data,
          total,
          offset: req.query.offset,
          count: data.length
        };
      }
    }
  );
}
