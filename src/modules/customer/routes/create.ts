import { FastifyInstance } from 'fastify';
import type { CustomerService } from '../customer.service.ts';
import { CustomerNewFormBody } from '../../../api-types.ts';

interface CreateCustomerPluginOptions {
  customerService: CustomerService;
}

export function applyCreateCustomerRoute (fastify:FastifyInstance, opts: CreateCustomerPluginOptions) {
  const { customerService } = opts;

  fastify.route<{ Body: CustomerNewFormBody }>(
    {
      method: 'POST',
      url: '/',
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
      },
      handler: async function createCustomer (req, res) {
        return await customerService.create(req.body);
      }
    }
  );
}
