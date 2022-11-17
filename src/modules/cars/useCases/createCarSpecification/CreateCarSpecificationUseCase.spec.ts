import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create Car Specification", () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

  let createCarSpecification: CreateCarSpecificationUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: "category",
      description: "description",
      daily_rate: 12,
      license_plate: "aaa-bbbb",
      fine_amount: 23,
      brand: "Marca",
      category_id: "23232323",
    });

    const { id: specification_id } =
      await specificationsRepositoryInMemory.create({
        name: "teste",
        description: "test",
      });

    const carSpecification = await createCarSpecification.execute({
      car_id,
      specifications_id: [specification_id],
    });

    expect(carSpecification).toHaveProperty("specifications");
    expect(carSpecification.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "123";
    const specifications_id = ["123", "323"];

    expect(async () => {
      await createCarSpecification.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
});
