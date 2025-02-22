import type { FastifyPluginCallback } from 'fastify';
import { createCustomerService } from '../customer.service.ts';
import get from './get.ts';
import create from './create.ts';
import { CustomerRepository } from '../customer.repository.ts';

export interface CustomerModuleOptions {
  customerRepository: CustomerRepository
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
