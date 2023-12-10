import { Repository } from "typeorm";

import { ClassroomTeamEmpresa } from "../Entities/ClassRoomTeamEmpresa";
import { ICreateClassroomTeamEmpresaDTO } from "../dtos/ICreateClassroomTeamEmpresaDTO";
import { IClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomTeamsRepository";
import { AppDataSource } from "../../Core/src/database/data-source";
import { ClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomTeamsRepository";

class ClassroomTeamsEmpresaRepository extends ClassroomTeamsRepository implements IClassroomTeamsRepository {
  private repository: Repository<ClassroomTeamEmpresa>;

  constructor() {
    super();
    this.repository = AppDataSource.getRepository(ClassroomTeamEmpresa);
  }
  
  async create({ name, classroom_id, creator_id, role }: ICreateClassroomTeamEmpresaDTO): Promise<ClassroomTeamEmpresa> {
    const ClassroomTeamEmpresa = this.repository.create({
      name,
      classroom_id,
      creator_id,
      role
    });

    await this.repository.save(ClassroomTeamEmpresa);

    return ClassroomTeamEmpresa
  }

  async findById(id: string): Promise<ClassroomTeamEmpresa | null> {
    const ClassroomTeamEmpresa = this.repository.findOneBy({ id });
    return ClassroomTeamEmpresa;
  }

}

export { ClassroomTeamsEmpresaRepository };