import { ICreateClassroomDTO } from "../../Core/src/modules/classrooms/dtos/ICreateClassroomDTO";

export interface IClassroomServicesStrategy{
    validateCreate(data:ICreateClassroomDTO): Promise<boolean>
}