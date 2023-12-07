import { Repository } from "typeorm";

import { ICreateClassroomDTO } from "../../dtos/ICreateClassroomDTO";
import { IClassroomsRepository } from "../IClassroomsRepository";
import { Classroom } from "../../entities/Classroom";
import { AppDataSource } from "../../../../database/data-source";
import { ClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomsRepository";



class ClassroomsRepositoryFaculdade extends ClassroomsRepository implements IClassroomsRepository {
  private repository: Repository<Classroom>;

  constructor() {
    this.repository = AppDataSource.getRepository(Classroom);
  }

  async create({ id, name, description, professor_id }: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.repository.create({
      id,
      name, 
      description,
      professor_id,
    });

    await this.repository.save(classroom);

    return classroom;
  }

  async findById(id: string): Promise<Classroom | null> {
    const classroom = await this.repository.findOneBy({ id });
    return classroom;
  }
  
}

export { ClassroomsRepositoryFaculdade };