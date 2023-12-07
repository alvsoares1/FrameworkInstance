import { inject, injectable } from 'tsyringe';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../../shared/errors/AppError';
import { IClassroomTeamServiceStrategy } from '../interfaces/IClassRoomTeamServicesStrategy';
import { ClassroomTeam } from '../entities/ClassroomTeam';
import { ICreateClassroomTeamDTO } from '../dtos/ICreateClassroomTeamDTO';

abstract class ClassroomTeamService {
  abstract create({ classroom_id, name, creator_id }: ICreateClassroomTeamDTO): Promise<ClassroomTeam>;
  abstract join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeam>;
  abstract details(id: string): Promise<ClassroomTeam>;
}

export { ClassroomTeamService };
