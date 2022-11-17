import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async create({
    id,
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available === true)
      .filter((car) => {
        if (!!brand || !!category_id || !!name) {
          return (
            car.brand === brand ||
            car.category_id === category_id ||
            car.name === name
          );
        }

        return true;
      });
  }

  async findById(card_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === card_id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
