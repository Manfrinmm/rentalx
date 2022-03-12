import { Request, Response, Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request: Request, response: Response) => {
  const all = specificationRepository.list();

  return response.status(201).json(all);
});

export { specificationsRoutes };
