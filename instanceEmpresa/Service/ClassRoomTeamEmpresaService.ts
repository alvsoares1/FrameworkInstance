import { inject, injectable } from 'tsyringe';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../Core/src/modules/accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../Core/src/shared/errors/AppError
import { IClassroomTeamServiceStrategy } from '../Interface/IClassRoomTeamServicesStrategy';
import { ClassroomTeamEmpresa } from '../Entities/ClassRoomTeamEmpresa';
import { ICreateClassroomTeamEmpresaDTO } from '../dtos/ICreateClassroomTeamEmpresaDTO';
import {ClassroomTeamService} from '../../Core/src/modules/classrooms/services/ClassroomTeamService'

@injectable()
class ClassroomTeamServiceEmpresa extends ClassroomTeamService{
  constructor(
    @inject('ClassroomTeamsRepository')
    private classroomTeamsRepository: IClassroomTeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ClassroomTeamValidateEmpresa')
    private ClassroomTeamServiceStrategy: IClassroomTeamServiceStrategy
  ) {
    super();
  }

  async create({ classroom_id, name, creator_id, role }: ICreateClassroomTeamEmpresaDTO): Promise<ClassroomTeamEmpresa> {

    const isValid = await this.ClassroomTeamServiceStrategy.validate_create({classroom_id,name,creator_id, role });

    if (isValid) {
      const ClassroomTeamEmpresa: ClassroomTeamEmpresa = await this.classroomTeamsRepository.create({
        classroom_id,
        name,
        creator_id,
        role,
      });

      return ClassroomTeamEmpresa;
    } else {
      throw new AppError('Validation failed. Unable to create Classroom Team.', 400);
    }
  }

  async join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeamEmpresa> {
    const classroomTeam:ClassroomTeamEmpresa = await this.classroomTeamsRepository.findById(team_id);
    const isValid = await this.ClassroomTeamServiceStrategy.validate_join({user_id, team_id});

    if(isValid){
      classroomTeam.members.push(user_id);
      await this.classroomTeamsRepository.create(classroomTeam);
      return classroomTeam;

    } else{
      throw new AppError('Validation failed. Unable to join Classroom Team.', 400);
    }
  }

  async details(id: string): Promise<ClassroomTeamEmpresa> {
    const ClassroomTeamEmpresa = await this.classroomTeamsRepository.findById(id);

    if (!ClassroomTeamEmpresa) {
      throw new AppError('Classroom Team not found!', 404);
    }

    return ClassroomTeamEmpresa;
  }
}

export { ClassroomTeamServiceEmpresa };
