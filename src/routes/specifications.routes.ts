import { Request, Response, Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationsRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateSpecificationService(
    specificationRepository
  );

  createCategoryService.execute({ name, description });

  return response.status(201).json();
});

specificationsRoutes.get("/", (request: Request, response: Response) => {
  const all = specificationRepository.list();

  return response.status(201).json(all);
});

export { specificationsRoutes };
