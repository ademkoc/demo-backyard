import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import { Tag } from '../../../infrastructure/http/swagger.ts';
import type { CarNewFormBody } from '../../../api-types.ts';
import type { CarService } from '../car.service.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Body: CarNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        tags: [Tag.CAR],
        body: { $ref: 'https://koc.app/schemas/rentacarserver/car-new-form.json' }
      },
      handler: async function createCarRouteHandler (req, res) {
        const carService = app.getDecorator<CarService>('carService');

        return {
          data: await carService.create(req.body)
        };
      }
    }
  );

  done();
};

export default fp(fn, {
  name: 'create-car-route-plugin',
  encapsulate: false
});
