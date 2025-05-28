import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import { Tag } from '../../../infrastructure/http/swagger.ts';
import type { CarService } from '../car.service.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Params: { car_id: number } }>(
    {
      method: 'GET',
      url: '/:car_id',
      schema: {
        tags: [Tag.CAR],
        params: {
          type: 'object',
          properties: {
            car_id: {
              type: 'number'
            }
          }
        }
      },
      handler: async function getCarRouteHandler (req, res) {
        const carService = app.getDecorator<CarService>('carService');

        return {
          data: await carService.getById(req.params.car_id)
        };
      }
    }
  );

  done();
};

export default fp(fn, {
  name: 'get-car-route-plugin',
  encapsulate: false
});
