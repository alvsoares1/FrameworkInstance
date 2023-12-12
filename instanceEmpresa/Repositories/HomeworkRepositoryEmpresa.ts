import { Repository } from "typeorm";

import { Homework } from "../../src/modules/homework/entities/Homework";
import { ICreateHomeworkDTO } from "../../src/modules/homework/dtos/ICreateHomeworkDTO";
import { IHomeworkRepository } from "../../src/modules/homework/repositories/IHomeworkRepository";
import { AppDataSource } from "../../src/database/data-source";
import {HomeworkRepository} from "../../src/modules/homework/repositories/implementations/HomeworkRepository"

class HomeworkRepositoryEmpresa extends HomeworkRepository implements IHomeworkRepository {
  protected repository: Repository<Homework>;

  constructor() {
    super();
    this.repository = AppDataSource.getRepository(Homework);
  }
  
  async create({ name, details, creator_id }: ICreateHomeworkDTO): Promise<Homework> {
    const homework= this.repository.create({
      name,
      details,
      creator_id,
    });

    await this.repository.save(homework);

    return homework
  }

}

export { HomeworkRepositoryEmpresa };