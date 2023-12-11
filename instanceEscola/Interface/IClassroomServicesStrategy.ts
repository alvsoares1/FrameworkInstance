import { ICreateClassroomEscolaDTO } from "../dtos/ICreateClassroomEscolaDTO";

export interface IClassroomServicesStrategy{
    validateCreate(data:ICreateClassroomEscolaDTO): Promise<boolean>
}