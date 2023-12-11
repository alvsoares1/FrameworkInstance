import { Repository } from "typeorm";

import { Homework } from "../../entities/Homework";
import { ICreateHomeworkDTO } from "../../dtos/ICreateHomeworkDTO";
import { IHomeworkRepository } from "../IHomeworkRepository";
import { AppDataSource } from "../../../../database/data-source";

abstract class HomeworkRepository implements IHomeworkRepository {
  abstract create({ name, details, creator_id }: ICreateHomeworkDTO): Promise<Homework>;
  abstract findById(id: string): Promise<Homework | null>;
  abstract findByName(name: string): Promise<Homework | null>;
}

export { HomeworkRepository };