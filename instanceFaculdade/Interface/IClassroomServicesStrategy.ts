import { ICreateClassroomFaculdadeDTO } from "../dtos/ICreateClassroomFaculdadeDTO";

export interface IClassroomServicesStrategy{
    validateCreate(data:ICreateClassroomFaculdadeDTO): Promise<boolean>
}