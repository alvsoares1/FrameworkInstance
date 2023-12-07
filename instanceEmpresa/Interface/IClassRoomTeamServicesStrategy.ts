import { ICreateClassroomTeamDTO } from '../dtos/ICreateClassroomTeamDTO';
import { ClassroomTeam } from '../entities/ClassroomTeam';
import { IRequestJoinClassroomTeam } from './IRequestJoinClassroomTeam';

export interface IClassroomTeamServiceStrategy {
  validate_create(data: ICreateClassroomTeamDTO): Promise<boolean>;
  join(data: IRequestJoinClassroomTeam): Promise<ClassroomTeam>;
}