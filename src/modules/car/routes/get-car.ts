import type { FastifyInstance } from 'fastify';
import type { CarService } from '../car.service.ts';

interface GetCarRouteOptions {
  carService: CarService;
}

export function getCarRoute (fastify: FastifyInstance, options: GetCarRouteOptions) {
  fastify.route<{ Params: { car_id: number } }>(
    {
      method: 'GET',
      url: '/:car_id',
      schema: {
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
        const { carService } = options;
        return {
          data: await carService.getById(req.params.car_id)
        };
      }
    }
  );
}
