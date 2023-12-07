import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";

export interface IClassroomServicesStrategy{
    validateCreate(data:ICreateClassroomDTO): Promise<boolean>
}