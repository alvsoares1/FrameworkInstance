import { Repository } from "typeorm";

import { ICreateClassroomEscolaDTO } from "../dtos/ICreateClassroomEscolaDTO";
import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";
import { Classroom } from "../../Core/src/modules/classrooms/entities/Classroom";
import { AppDataSource } from "../../Core/src/database/data-source";
import { ClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomsRepository";



class ClassroomsRepositoryEscola extends ClassroomsRepository implements IClassroomsRepository {
  private repository: Repository<Classroom>;

  constructor() {
    super();
    this.repository = AppDataSource.getRepository(Classroom);
  }

  async create({ id, name, description, professor_id }: ICreateClassroomEscolaDTO): Promise<Classroom> {
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

export { ClassroomsRepositoryEscola };