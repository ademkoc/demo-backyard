import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';
import type { RentNewFormBody } from '../../../api-types.ts';
import { Tag } from '../../../infrastructure/http/swagger.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Body: RentNewFormBody }>(
    {
      method: 'PATCH',
      url: '/rent',
      schema: {
        tags: [Tag.CAR],
        body: { $ref: 'https://koc.app/schemas/rentacarserver/rent-new-form.json' }
      },
      handler: async function rentCarRouteHandler (req, res) {
        const carService = app.getDecorator<CarService>('carService');

        return {
          data: await carService.rent(req.body)
        };
      }
    }
  );

  done();
};

export default fp(fn, {
  name: 'rent-car-route-plugin',
  encapsulate: false
});
