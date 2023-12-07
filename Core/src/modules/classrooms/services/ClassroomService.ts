import { inject, injectable } from "tsyringe";

import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";
import { Classroom } from "../entities/Classroom";
import { IRequestJoinClassroom } from "../interfaces/IRequestJoinClassroom";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../accounts/repositories/IUsersRepository";
import { IClassroomServicesStrategy } from "../interfaces/IClassroomServicesStrategy";


abstract class ClassroomService {
  abstract create({ name, description, professor_id }: ICreateClassroomDTO): Promise<Classroom>;
  abstract join({ classroom_id, user_id }: IRequestJoinClassroom): Promise<Classroom>;
  abstract details(id: string): Promise<Classroom>;
}

export { ClassroomService };