import type { FastifyInstance } from 'fastify';
import type { CustomerService } from '../customer.service.ts';

interface GetCustomerPluginOptions {
  customerService: CustomerService;
}

export function applyGetCustomerRoute (fastify:FastifyInstance, opts: GetCustomerPluginOptions) {
  const { customerService } = opts;

  fastify.route<{ Params: { customer_id: string } }>(
    {
      method: 'GET',
      url: '/:customer_id',
      schema: {
        params: {
          type: 'object',
          properties: {
            customer_id: { type: 'string' }
          }
        }
      },
      handler: async function createCustomer (req, res) {
        return await customerService.findById(+req.params.customer_id);
      }
    }
  );
}
