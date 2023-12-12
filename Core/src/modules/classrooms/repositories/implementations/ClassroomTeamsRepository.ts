import { Repository } from "typeorm";

import { ClassroomTeam } from "../../entities/ClassroomTeam";
import { ICreateClassroomTeamDTO } from "../../dtos/ICreateClassroomTeamDTO";
import { IClassroomTeamsRepository } from "../IClassroomTeamsRepository";
import { AppDataSource } from "../../../../database/data-source";

class ClassroomTeamsRepository implements IClassroomTeamsRepository {
  private repository: Repository<ClassroomTeam>;

  constructor() {
    this.repository = AppDataSource.getRepository(ClassroomTeam);
  }
  
  async create({ name, classroom_id, creator_id }: ICreateClassroomTeamDTO): Promise<ClassroomTeam> {
    const classroomTeam = this.repository.create({
      name,
      classroom_id,
      creator_id,
    });

    await this.repository.save(classroomTeam);

    return classroomTeam
  }

  async findById(id: string): Promise<ClassroomTeam | null> {
    const classroomTeam = this.repository.findOneBy({ id });
    return classroomTeam;
  }

}

export { ClassroomTeamsRepository };