import type { FastifyInstance } from 'fastify';
import type { CustomerService } from '../customer.service.ts';
import type { CustomerNewFormBody } from '../../../api-types.ts';

interface CreateCustomerPluginRouteOptions {
  customerService: CustomerService;
}

export function createCustomerRoute (fastify: FastifyInstance, opts: CreateCustomerPluginRouteOptions) {
  const { customerService } = opts;

  fastify.route<{ Body: CustomerNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
      },
      handler: async function createCustomerRouteHandler (req, res) {
        return await customerService.create(req.body);
      }
    }
  );
}
