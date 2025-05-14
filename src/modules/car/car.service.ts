import { CarRepository } from './car.repository.ts';

export class CarService {
  #carRepository: CarRepository;

  constructor (carRepository: CarRepository) {
    this.#carRepository = carRepository;
  }

  create () {
    return this.#carRepository.create({
      model: '',
      brand: '',
      year: '2000',
      km: '',
      isAvailable: false
    });
  }
}
