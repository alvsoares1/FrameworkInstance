import { ICreateClassroomEmpresaDTO } from "../dtos/ICreateClassroomEmpresaDTO";

export interface IClassroomServicesStrategy{
    validateCreate(data:ICreateClassroomEmpresaDTO): Promise<boolean>
}