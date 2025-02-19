import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CustomerService } from '../customer.service.ts';
import { CustomerNewFormBody } from '../../../api-types.ts';

interface CreateCustomerPluginOptions {
  customerService: CustomerService;
}

const fn: FastifyPluginCallback<CreateCustomerPluginOptions> = (
  fastify,
  { customerService },
  done
) => {
  fastify.post<{ Body: CustomerNewFormBody }>('/', {
    schema: {
      body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
    }
  }, async function (req, res) {
    return await customerService.create(req.body);
  });

  done();
};

export default fp(fn);
