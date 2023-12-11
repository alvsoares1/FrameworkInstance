import { ICreateClassroomTeamEscolaDTO } from '../dtos/ICreateClassroomTeamEscolaDTO';
import { ClassroomTeam } from '../../Core/src/modules/classrooms/entities/ClassroomTeam';
import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';

export interface IClassroomTeamServiceStrategy {
  validate_create(data: ICreateClassroomTeamEscolaDTO): Promise<boolean>;
  validate_join(data: IRequestJoinClassroomTeam): Promise<boolean>;
}