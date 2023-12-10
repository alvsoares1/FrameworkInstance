import { ICreateHomeworkDTO } from "../dtos/ICreateHomeworkDTO";
import { Homework } from "../entities/Homework";

interface IHomeworkRepository {
  create(data: ICreateHomeworkDTO): Promise<Homework>;
  findByName(name: string): Promise<Homework | null>;
  findById(id: string): Promise<Homework | null>;
}

export { IHomeworkRepository };