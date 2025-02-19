import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CustomerService } from '../customer.service.ts';

interface GetCustomerPluginOptions {
  customerService: CustomerService;
}

const fn: FastifyPluginCallback<GetCustomerPluginOptions> = (
  fastify,
  { customerService },
  done
) => {
  fastify.get<{ Params: { customer_id: string } }>('/:customer_id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          customer_id: { type: 'string' }
        }
      }
    }
  }, async function (req, res) {
    return await customerService.findById(+req.params.customer_id);
  });

  done();
};

export default fp(fn);
