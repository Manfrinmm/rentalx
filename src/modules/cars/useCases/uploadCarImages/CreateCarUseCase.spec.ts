import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create car", () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toMatchObject(carCreated);
    expect(carCreated).toHaveProperty("id");
  });

  it("should not be able to create a new car with license plate exists", async () => {
    const car = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    await createCarUseCase.execute(car);

    expect(async () => {
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = {
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("available", true);
  });
});
