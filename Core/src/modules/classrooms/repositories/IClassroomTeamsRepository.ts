import { ICreateClassroomTeamDTO } from "../dtos/ICreateClassroomTeamDTO";
import { ClassroomTeam } from "../entities/ClassroomTeam";

interface IClassroomTeamsRepository {
  create(data: ICreateClassroomTeamDTO): Promise<ClassroomTeam>;

  findById(id: string): Promise<ClassroomTeam | null>;
}

export { IClassroomTeamsRepository };