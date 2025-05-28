import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CustomerService } from '../customer.service.ts';
import { Tag } from '../../../infrastructure/http/swagger.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Params: { customer_id: number } }>(
    {
      method: 'GET',
      url: '/:customer_id',
      schema: {
        tags: [Tag.CUSTOMER],
        params: {
          type: 'object',
          properties: {
            customer_id: { type: 'number' }
          }
        }
      },
      handler: async function getCustomerRouteHandler (req, res) {
        const customerService = app.getDecorator<CustomerService>('customerService');

        return {
          data: await customerService.findById(req.params.customer_id)
        };
      }
    }
  );

  done();
};

export default fp(fn, {
  name: 'get-customer-route-plugin',
  encapsulate: false
});
