import { Category } from "../model/Category";

// DTO
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
}

export { ICategoryRepository, ICreateCategoryDTO };
