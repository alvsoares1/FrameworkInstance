import { inject, injectable } from 'tsyringe';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../../shared/errors/AppError';
import { ClassroomTeam } from '../entities/ClassroomTeam';
import { ICreateClassroomTeamDTO } from '../dtos/ICreateClassroomTeamDTO';

@injectable()
class ClassroomTeamService {
  constructor(
    @inject('ClassroomTeamsRepository')
    private classroomTeamsRepository: IClassroomTeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async create({ classroom_id, name, creator_id }: ICreateClassroomTeamDTO): Promise<ClassroomTeam> {

      const classroomTeam: ClassroomTeam = await this.classroomTeamsRepository.create({
        classroom_id,
        name,
        creator_id,
      });

      return classroomTeam;
  }

  async join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeam> {
    const classroomTeam = await this.classroomTeamsRepository.findById(team_id);

    if (!classroomTeam) {
      throw new AppError('Classroom Team not found!', 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    classroomTeam.members.push(user);

    await this.classroomTeamsRepository.create(classroomTeam);

    return classroomTeam;
  }


  async details(id: string): Promise<ClassroomTeam> {
    const classroomTeam = await this.classroomTeamsRepository.findById(id);

    if (!classroomTeam) {
      throw new AppError('Classroom Team not found!', 404);
    }

    return classroomTeam;
  }
}

export { ClassroomTeamService };
