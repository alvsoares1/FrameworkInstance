import { Repository } from "typeorm";

import { ICreateClassroomDTO } from "../../dtos/ICreateClassroomDTO";
import { IClassroomsRepository } from "../IClassroomsRepository";
import { Classroom } from "../../entities/Classroom";
import { AppDataSource } from "../../../../database/data-source";


class ClassroomsRepository implements IClassroomsRepository {
  private repository: Repository<Classroom>;

  constructor() {
    this.repository = AppDataSource.getRepository(Classroom);
  }

  async create({ id, name, description}: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.repository.create({
      id,
      name, 
      description,
    });

    await this.repository.save(classroom);

    return classroom;
  }

  async findById(id: string): Promise<Classroom | null> {
    const classroom = await this.repository.findOneBy({ id });
    return classroom;
  }
  
}

export { ClassroomsRepository };