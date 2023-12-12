import { inject, injectable } from "tsyringe";

import { ICreateClassroomEmpresaDTO } from "../dtos/ICreateClassroomEmpresaDTO";
import { IClassroomsRepository } from "../../core/src/modules/classrooms/repositories/IClassroomsRepository";
import { Classroom } from "../../core/src/modules/classrooms/entities/Classroom";
import { IRequestJoinClassroom } from "../../core/src/modules/classrooms/interfaces/IRequestJoinClassroom";
import { AppError } from "../../core/src/shared/errors/AppError";
import { IUsersRepository } from "../../core/src/modules/accounts/repositories/IUsersRepository";
import { IClassroomServicesStrategy } from "../Interface/IClassroomServicesStrategy";
import {ClassroomService} from '../../Core/src/modules/classrooms/services/ClassroomService'


@injectable()
class ClassroomServiceEmpresa extends ClassroomService {
  constructor(
    @inject("ClassroomsRepository")
    private classrooomsRepository: IClassroomsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassroomValidateEmpresa")
    private validateClassroomServicesStrategy: IClassroomServicesStrategy
  ) {
    super();
  }
  
  async create({ name, description, maneger_id }: ICreateClassroomEmpresaDTO): Promise<Classroom> {
    const isValidationPassed = await this.validateClassroomServicesStrategy.validateCreate({name,description,maneger_id});

    if (isValidationPassed) {
      const classroom = await this.classrooomsRepository.create({
        name,
        description,
        maneger_id,
      });
      return classroom;
      
    }else {
      throw new AppError("Validation failed", 400);
    }
  }
}

export { ClassroomServiceEmpresa };