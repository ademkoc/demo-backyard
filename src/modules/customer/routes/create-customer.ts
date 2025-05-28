import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CustomerNewFormBody } from '../../../api-types.ts';
import type { CustomerService } from '../customer.service.ts';
import { Tag } from '../../../infrastructure/http/swagger.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.route<{ Body: CustomerNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        tags: [Tag.CUSTOMER],
        body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
      },
      handler: async function createCustomerRouteHandler (req, res) {
        const customerService = app.getDecorator<CustomerService>('customerService');

        return {
          data: await customerService.create(req.body)
        };
      }
    }
  );

  done();
};

export default fp(fn, {
  name: 'create-customer-route-plugin',
  encapsulate: false
});
