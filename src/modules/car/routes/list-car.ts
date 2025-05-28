import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';
import type { Pagination } from '../../../api-types.ts';
import { Tag } from '../../../infrastructure/http/swagger.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Querystring: Pagination }>(
    {
      method: 'GET',
      url: '/',
      schema: {
        tags: [Tag.CAR],
        querystring: { $ref: 'https://koc.app/schemas/rentacarserver/pagination.json' }
      },
      handler: async function listCarRouteHandler (req, res) {
        const carService = app.getDecorator<CarService>('carService');

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

  done();
};

export default fp(fn, {
  name: 'list-car-route-plugin',
  encapsulate: false
});
