import { Request, Response, Router } from "express";

import { CategoryRepository } from "../modules/cars/repositories/CategoryRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();

const categoriesRepository = new CategoryRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).json();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const all = categoriesRepository.list();

  return response.status(201).json(all);
});

export { categoriesRoutes };
