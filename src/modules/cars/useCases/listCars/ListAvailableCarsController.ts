import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

interface IQueryParams {
  brand?: string;
  category_id?: string;
  name?: string;
}

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query as IQueryParams;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    });

    return response.status(201).json(cars);
  }
}

export { ListAvailableCarsController };
