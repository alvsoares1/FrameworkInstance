import { Repository } from "typeorm";
import { IHomeworkRepository } from "../IHomeworkRepository";
import { Homework } from "../../entities/Homework";
import { AppDataSource } from "../../../../database/data-source";
import { ICreateHomeworkDTO } from "../../dtos/ICreateHomeworkDTO";

class HomeworkRepository implements IHomeworkRepository {
  protected repository: Repository<Homework>;

  constructor() {
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

export { HomeworkRepository };