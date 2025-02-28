import type { FastifyPluginCallback } from 'fastify';
import { createCustomerService } from '../customer.service.ts';
import { applyGetCustomerRoute } from './get.ts';
import { applyCreateCustomerRoute } from './create.ts';
import { CustomerRepository } from '../customer.repository.ts';

export interface CustomerModuleOptions {
  customerRepository: CustomerRepository
}

const fn: FastifyPluginCallback<CustomerModuleOptions> = (fastify, options, done) => {
  const customerService = createCustomerService(fastify, {
    customerRepository: options.customerRepository
  });

  applyGetCustomerRoute(fastify, { customerService });
  applyCreateCustomerRoute(fastify, { customerService });

  done();
};

export default fn;
