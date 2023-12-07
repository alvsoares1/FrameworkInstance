import { Repository } from "typeorm";

import { ClassroomTeam } from "../../entities/ClassroomTeam";
import { ICreateClassroomTeamDTO } from "../../dtos/ICreateClassroomTeamDTO";
import { IClassroomTeamsRepository } from "../IClassroomTeamsRepository";
import { AppDataSource } from "../../../../database/data-source";

abstract class ClassroomTeamsRepository implements IClassroomTeamsRepository {
  abstract create({ name, classroom_id, creator_id }: ICreateClassroomTeamDTO): Promise<ClassroomTeam>;
  abstract findById(id: string): Promise<ClassroomTeam | null>;
}

export { ClassroomTeamsRepository };