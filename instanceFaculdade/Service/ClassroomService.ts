import { inject, injectable } from "tsyringe";

import {ICreateClassroomFaculdadeDTO} from '../dtos/ICreateClassroomFaculdadeDTO'
import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";
import { Classroom } from "../../Core/src/modules/classrooms/entities/Classroom";
import { IRequestJoinClassroom } from "../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroom";
import { AppError } from "../../Core/src/shared/errors/AppError";
import { IUsersRepository } from "../../Core/src/modules/accounts/repositories/IUsersRepository";
import { IClassroomServicesStrategy } from "../Interface/IClassroomServicesStrategy";
import {ClassroomService} from '../../Core/src/modules/classrooms/services/ClassroomService'


@injectable()
class ClassroomServiceFaculdade extends ClassroomService{
  constructor(
    @inject("ClassroomsRepository")
    private classrooomsRepository: IClassroomsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassroomValidateFaculdade")
    private validateClassroomServicesStrategy: IClassroomServicesStrategy
  ) {
    super();
  }
  
  async create({ name, description, professor_id }: ICreateClassroomFaculdadeDTO): Promise<Classroom> {
    const isValidationPassed = await this.validateClassroomServicesStrategy.validateCreate({name,description,professor_id});

    if (isValidationPassed) {
      const classroom = await this.classrooomsRepository.create({
        name,
        description,
        professor_id,
      });
      return classroom;
      
    }else {
      throw new AppError("Validation failed", 400);
    }
  }

  async join({ classroom_id, user_id }: IRequestJoinClassroom): Promise<Classroom> {
    const classroom = await this.classrooomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError("Classroom not found!", 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    classroom.members.push(user);

    await this.classrooomsRepository.create(classroom);

    return classroom;
  }

  async details(id: string): Promise<Classroom> {
    const classroom = await this.classrooomsRepository.findById(id);

    if (!classroom) {
      throw new AppError("Classroom not found!", 404);
    }

    return classroom;
  }
}

export { ClassroomServiceFaculdade };