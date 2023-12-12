import { inject, injectable } from "tsyringe";

import {ICreateClassroomEscolaDTO} from '../dtos/ICreateClassroomEscolaDTO'
import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";
import { Classroom } from "../../Core/src/modules/classrooms/entities/Classroom";
import { IRequestJoinClassroom } from "../../Core/src/modules/classrooms/interfaces/IRequestJoinClassroom";
import { AppError } from "../../Core/src/shared/errors/AppError";
import { IUsersRepository } from "../../Core/src/modules/accounts/repositories/IUsersRepository";
import { IClassroomServicesStrategy } from "../Interface/IClassroomServicesStrategy";
import {ClassroomService} from '../../Core/src/modules/classrooms/services/ClassroomService'


@injectable()
class ClassroomServiceEscola extends ClassroomService{
  constructor(
    @inject("ClassroomsRepository")
    private classrooomsRepository: IClassroomsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassroomValidateEscola")
    private validateClassroomServicesStrategy: IClassroomServicesStrategy
  ) {
    super();
  }
  
  async create({ name, description, professor_id }: ICreateClassroomEscolaDTO): Promise<Classroom> {
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
}

export { ClassroomServiceEscola };