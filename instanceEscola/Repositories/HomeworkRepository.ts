import { Repository } from "typeorm";

import { Homework } from "../../src/modules/homework/entities/Homework";
import { ICreateHomeworkDTO } from "../../src/modules/homework/dtos/ICreateHomeworkDTO";
import { IHomeworkRepository } from "../../src/modules/homework/repositories/IHomeworkRepository";
import { AppDataSource } from "../../src/database/data-source";
import {HomeworkRepository} from "../../src/modules/homework/repositories/implementations/HomeworkRepository"

class HomeworkRepositoryEscola extends HomeworkRepository implements IHomeworkRepository {
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

  async findById(id: string): Promise<Homework | null> {
    const homework = this.repository.findOneBy({ id });
    return homework;
  }

  async findByName(name: string): Promise<Homework | null> {
    const homework = this.repository.findOneBy({ name });
    return homework;
  }
}

export { HomeworkRepositoryEscola };