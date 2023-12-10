import { ICreateClassroomDTO } from "../../Core/src/modules/classrooms/dtos/ICreateClassroomDTO";

interface ICreateClassroomEmpresaDTO extends ICreateClassroomDTO{
    maneger_id: string;
} 
export {ICreateClassroomEmpresaDTO}