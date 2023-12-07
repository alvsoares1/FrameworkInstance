import { ICreateClassroomTeamDTO } from '../../Core/src/modules/classrooms/dtos/ICreateClassroomTeamDTO';
import { ClassroomTeam } from '../../Core/src/modules/classrooms/entities/ClassroomTeam';
import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';

export interface IClassroomTeamServiceStrategy {
  validate_create(data: ICreateClassroomTeamDTO): Promise<boolean>;
  join(data: IRequestJoinClassroomTeam): Promise<ClassroomTeam>;
}