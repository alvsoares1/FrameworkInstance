import { Repository } from "typeorm";

import { ICreateClassroomDTO } from "../../dtos/ICreateClassroomDTO";
import { IClassroomsRepository } from "../IClassroomsRepository";
import { Classroom } from "../../entities/Classroom";
import { AppDataSource } from "../../../../database/data-source";


abstract class ClassroomsRepository implements IClassroomsRepository {
  abstract create({ id, name, description, professor_id }: ICreateClassroomDTO): Promise<Classroom>;
  abstract findById(id: string): Promise<Classroom | null>;
}

export { ClassroomsRepository };