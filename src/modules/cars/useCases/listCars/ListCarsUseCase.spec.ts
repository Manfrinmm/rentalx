import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List cars", () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car1 = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };
    const car2 = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "2aa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    carsRepositoryInMemory.create(car1);
    carsRepositoryInMemory.create(car2);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual(
      expect.arrayContaining([expect.objectContaining(car2)])
    );
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    const car2 = {
      name: "car_name",
      description: "description",
      daily_rate: 12,
      license_plate: "2aa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    carsRepositoryInMemory.create(car1);
    carsRepositoryInMemory.create(car2);

    const cars = await listAvailableCarsUseCase.execute({ name: car2.name });

    console.log({ cars });

    expect(cars).toEqual(
      expect.arrayContaining([expect.objectContaining(car2)])
    );
  });
  it("should be able to list all available cars by name", async () => {
    const car1 = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    const car2 = {
      name: "car_name",
      description: "description",
      daily_rate: 12,
      license_plate: "2aa-bbbb",
      fine_amount: 23,
      brand: "Marca2",
      category_id: "23232323",
    };

    carsRepositoryInMemory.create(car1);
    carsRepositoryInMemory.create(car2);

    const cars = await listAvailableCarsUseCase.execute({ brand: car2.brand });

    console.log({ cars });

    expect(cars).toEqual(
      expect.arrayContaining([expect.objectContaining(car2)])
    );
  });

  it("should be able to list all available cars by category", async () => {
    const car1 = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "2999",
    };

    const car2 = {
      name: "car_name",
      description: "description",
      daily_rate: 12,
      license_plate: "2aa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    carsRepositoryInMemory.create(car1);
    carsRepositoryInMemory.create(car2);

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car2.category_id,
    });

    expect(cars).toEqual(
      expect.arrayContaining([expect.objectContaining(car2)])
    );
  });
});
