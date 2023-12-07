import { Repository } from "typeorm";

import { ICreateClassroomFaculdadeDTO } from "../dtos/ICreateClassroomFaculdadeDTO";
import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";
import { Classroom } from "../../Core/src/modules/classrooms/entities/Classroom";
import { AppDataSource } from "../../Core/src/database/data-source";
import { ClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomsRepository";



class ClassroomsRepositoryFaculdade extends ClassroomsRepository implements IClassroomsRepository {
  private repository: Repository<Classroom>;

  constructor() {
    super();
    this.repository = AppDataSource.getRepository(Classroom);
  }

  async create({ id, name, description, professor_id }: ICreateClassroomFaculdadeDTO): Promise<Classroom> {
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