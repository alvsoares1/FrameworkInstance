import { ICreateClassroomTeamEmpresaDTO } from '../dtos/ICreateClassroomTeamEmpresaDTO';
import { ClassroomTeamEmpresa } from '../Entities/ClassRoomTeamEmpresa';
import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';

export interface IClassroomTeamServiceStrategy {
  validate_create(data: ICreateClassroomTeamEmpresaDTO): Promise<boolean>;
  join(data: IRequestJoinClassroomTeam): Promise<ClassroomTeamEmpresa>;
}