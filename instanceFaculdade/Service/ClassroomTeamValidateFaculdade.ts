    import {inject, injectable } from 'tsyringe';
    import { ICreateClassroomTeamFaculdadeDTO } from '../dtos/ICreateClassroomTeamFaculdadeDTO';
    import { ClassroomTeam } from '../../Core/src/modules/classrooms/entities/ClassroomTeam';
    import { IClassroomTeamsRepository } from '../../Core/src/modules/classrooms/repositories/IClassroomTeamsRepository';
    import { IRequestJoinClassroomTeam } from '../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroomTeam';
    import { IUsersRepository } from '../../Core/src/modules/accounts/repositories/IUsersRepository';
    import { AppError } from '../../Core/src/shared/errors/AppError';
    import {IClassroomTeamServiceStrategy} from '../Interface/IClassRoomTeamServicesStrategy'
    import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";


    @injectable()
    class ClassroomTeamValidateFaculdade implements IClassroomTeamServiceStrategy{
        constructor(
            @inject('ClassroomTeamsRepository')
            private classroomTeamsRepository: IClassroomTeamsRepository,
            @inject('UsersRepository')
            private usersRepository: IUsersRepository,
            @inject("ClassroomsRepository")
            private classrooomsRepository: IClassroomsRepository,
          ) {}
    
          async validate_create({ classroom_id, name, creator_id }: ICreateClassroomTeamFaculdadeDTO): Promise<boolean> {
            const classroom = await this.classrooomsRepository.findById(classroom_id);

            if (!classroom) {
              throw new AppError('Classroom not found!', 404);
          } else{
              return true
            }
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
    
        const isUserAlreadyMember = classroomTeam.members.some(member => member.id === user_id);
        if (isUserAlreadyMember) {
          throw new AppError('User is already a member of the team!', 400);
        }
    
        classroomTeam.members.push(user);
    
        await this.classroomTeamsRepository.create(classroomTeam);
    
        return classroomTeam;
      }
    }
    
    export { ClassroomTeamValidateFaculdade };
