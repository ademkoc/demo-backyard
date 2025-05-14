import { type CustomerNewFormBody } from '../../api-types.ts';
import { CustomerRepository } from './customer.repository.ts';

export class CustomerService {
  #customerRepository: CustomerRepository;

  constructor (customerRepository: CustomerRepository) {
    this.#customerRepository = customerRepository;
  }

  async create (payload: CustomerNewFormBody) {
    const newCustomer = this.#customerRepository.insert(payload);

    await this.#customerRepository.getEntityManager().flush();

    return newCustomer;
  }

  async findById (id: number) {
    const asd = await this.#customerRepository.findOneOrFail(id);

    return asd;
  }
}
