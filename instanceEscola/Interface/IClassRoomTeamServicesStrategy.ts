import { ICreateClassroomTeamEscolaDTO } from '../dtos/ICreateClassroomTeamEscolaDTO';
import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';

export interface IClassroomTeamServiceStrategy {
  validate_create(data: ICreateClassroomTeamEscolaDTO): Promise<boolean>;
  validate_join(data: IRequestJoinClassroomTeam): Promise<boolean>;
}