import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { Classroom } from "../entities/Classroom";

interface IClassroomsRepository {
  create(data: ICreateClassroomDTO): Promise<Classroom>;

  findById(id: string): Promise<Classroom | null>; 
}

export { IClassroomsRepository };