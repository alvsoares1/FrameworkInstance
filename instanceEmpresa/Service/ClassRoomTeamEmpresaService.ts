import { inject, injectable } from 'tsyringe';
import { ClassroomTeamService } from '../../Core/src/modules/classrooms/services/ClassroomTeamService';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../Core/src/modules/accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../Core/src/shared/errors/AppError';
import { IClassroomTeamServiceStrategy } from '../Interface/IClassRoomTeamServicesStrategy';
import { ClassroomTeamEmpresa } from '../Entities/ClassRoomTeamEmpresa';
import { ICreateClassroomTeamEmpresaDTO } from '../dtos/ICreateClassroomTeamEmpresaDTO';

@injectable()
class ClassroomTeamServiceEmpresa extends ClassroomTeamService {
  constructor(
    @inject('ClassroomTeamsRepository')
    private classroomTeamsRepository: IClassroomTeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ClassroomTeamValidateEmpresa')
    private ClassroomTeamServiceStrategy: IClassroomTeamServiceStrategy
  ) {
    super(classroomTeamsRepository, usersRepository);
  }

  async create({ classroom_id, name, creator_id, role }: ICreateClassroomTeamEmpresaDTO): Promise<ClassroomTeamEmpresa> {
    const isValidationPassed = await this.ClassroomTeamServiceStrategy.validate_create({classroom_id, name, creator_id, role });

    if (isValidationPassed) {
      const classroomTeamEmpresa: ClassroomTeamEmpresa = await this.classroomTeamsRepository.create({
        classroom_id,
        name,
        creator_id,
        role,
      });

      return classroomTeamEmpresa;
    } else {
      throw new AppError('Validation failed. Unable to create Classroom Team.', 400);
    }
  }

  async join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeamEmpresa> {
    const classroomTeamEmpresa: ClassroomTeamEmpresa = await this.classroomTeamsRepository.findById(team_id);
    const isValidationPassed = await this.ClassroomTeamServiceStrategy.validate_join({user_id, team_id});

    if (isValidationPassed) {
      classroomTeamEmpresa.members.push(user_id);
      await this.classroomTeamsRepository.create(classroomTeamEmpresa);
      return classroomTeamEmpresa;
    } else {
      throw new AppError('Validation failed. Unable to join Classroom Team.', 400);
    }
  }
}

export { ClassroomTeamServiceEmpresa };