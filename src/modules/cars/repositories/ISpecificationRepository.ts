import { Category } from "../model/Category";

// DTO
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  list(): Category[];
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Category;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
