import { Category } from "../../model/Category";

// DTO
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Category[];
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(name: string): Category;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
