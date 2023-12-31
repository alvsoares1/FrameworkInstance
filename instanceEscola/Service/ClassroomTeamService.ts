import { inject, injectable } from 'tsyringe';
import { IClassroomTeamsRepository } from '../../Core/src/modules/classrooms/repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../Core/src/modules/accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../Core/src/shared/errors/AppError';
import { IClassroomTeamServiceStrategy } from '../Interface/IClassRoomTeamServicesStrategy';
import { ClassroomTeam } from '../../Core/src/modules/classrooms/entities/ClassroomTeam';
import { ICreateClassroomTeamEscolaDTO } from '../dtos/ICreateClassroomTeamEscolaDTO';
import {ClassroomTeamService} from '../../Core/src/modules/classrooms/services/ClassroomTeamService'

@injectable()
class ClassroomTeamServiceEscola extends ClassroomTeamService {
  constructor(
    @inject('ClassroomTeamsRepository')
    private classroomTeamsRepository: IClassroomTeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ClassroomTeamValidateEscola')
    private ClassroomTeamServiceStrategy: IClassroomTeamServiceStrategy
  ) {
    super();
  }

  async create({ classroom_id, name, creator_id }: ICreateClassroomTeamEscolaDTO): Promise<ClassroomTeam> {

    const isValid = await this.ClassroomTeamServiceStrategy.validate_create({classroom_id,name,creator_id });

    if (isValid) {
      const classroomTeam: ClassroomTeam = await this.classroomTeamsRepository.create({
        classroom_id,
        name,
        creator_id,
      });

      return classroomTeam;
    } else {
      throw new AppError('Validation failed. Unable to create Classroom Team.', 400);
    }
  }

  async join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeam> {
    const classroomTeam:ClassroomTeam = await this.classroomTeamsRepository.findById(team_id);
    const isValid = await this.ClassroomTeamServiceStrategy.validate_join({user_id, team_id});

    if(isValid){
      classroomTeam.members.push(user_id);
      await this.classroomTeamsRepository.create(classroomTeam);
      return classroomTeam;

    } else{
      throw new AppError('Validation failed. Unable to join Classroom Team.', 400);
    }
  }

}

export { ClassroomTeamServiceEscola };
