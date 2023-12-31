import {inject, injectable } from 'tsyringe';
import { ICreateClassroomTeamEmpresaDTO } from '../dtos/ICreateClassroomTeamDTO';
import { ClassroomTeamEmpresa } from '../entities/ClassroomTeam';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { IUsersRepository } from '../../accounts/repositories/IUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import {IClassroomTeamServiceStrategy} from '../Interface/IClassRoomTeamServicesStrategy'
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";


@injectable()
class ClassroomTeamValidateEmpresa implements IClassroomTeamServiceStrategy{
    constructor(
        @inject('ClassroomTeamsRepository')
        private classroomTeamsRepository: IClassroomTeamsRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject("ClassroomsRepository")
        private classrooomsRepository: IClassroomsRepository,
      ) {}

      async validate_create({ classroom_id, name, creator_id }: ICreateClassroomTeamEmpresaDTO): Promise<boolean> {
        const classroom = await this.classrooomsRepository.findById(classroom_id);
        const maneger = await this.usersRepository.findById(creator_id);

        if (!classroom) {
          throw new AppError('Classroom not found!', 404);
      } 
        if(!maneger || maneger.role !==2){
          throw new AppError('Invalid manager!',400)
        }

        return true
      }
      

      async validate_join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<boolean> {
        const classroomTeam = await this.classroomTeamsRepository.findById(team_id);
        if (!classroomTeam) {
          throw new AppError('Classroom Team not found!', 404);
        }
    
        const user = await this.usersRepository.findById(user_id);
    
        if (!user) {
          throw new AppError('User not found!', 404);
        }
    
        const isUserAlreadyMember = classroomTeam.members.some(member => member.id === user_id);
        if (isUserAlreadyMember) {
          throw new AppError('User is already a member of the team!', 400);
        }

     
        if(user.role != classroomTeam.role){
          throw new AppError('Validation failed. Not the same role')
        }


        return true
      }
}

export { ClassroomTeamValidateEmpresa };
