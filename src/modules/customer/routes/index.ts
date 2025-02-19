import type { FastifyPluginCallback } from 'fastify';
import { createCustomerService } from '../customer.service.ts';
import get from './get.ts';
import create from './create.ts';
import { Services } from '../../../infrastructure/db/db.ts';

export interface CustomerModuleOptions {
  customerRepository: Services['customer']
}

const fn: FastifyPluginCallback<CustomerModuleOptions> = (fastify, options, done) => {
  const customerService = createCustomerService(fastify, {
    customerRepository: options.customerRepository
  });

  fastify.register(get, { customerService });
  fastify.register(create, { customerService });

  done();
};

export default fn;
