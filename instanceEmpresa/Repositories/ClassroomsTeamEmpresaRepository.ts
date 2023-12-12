import { Repository } from "typeorm";
import { ICreateClassroomTeamEmpresaDTO } from "../dtos/ICreateClassroomTeamEmpresaDTO";
import { IClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomTeamsRepository";
import { ClassroomTeamEmpresa } from "../../Core/src/modules/classrooms/entities/ClassroomTeamEmpresa";
import { AppDataSource } from "../../Core/src/database/data-source";
import { ClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomTeamsRepository";

class ClassroomTeamEmpresaRepository extends ClassroomTeamsRepository implements IClassroomTeamsRepository {
  private repository: Repository<ClassroomTeamEmpresa>;

  constructor() {
    super();
    this.repository = AppDataSource.getRepository(ClassroomTeamEmpresa);
  }

  async create({ classroom_id, name, creator_id, role }: ICreateClassroomTeamEmpresaDTO): Promise<ClassroomTeamEmpresa> {
    const classroomTeamEmpresa = this.repository.create({
      classroom_id,
      name,
      creator_id,
      role,
    });

    await this.repository.save(classroomTeamEmpresa);

    return classroomTeamEmpresa;
  }
}

export { ClassroomTeamEmpresaRepository };