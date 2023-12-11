import { ICreateClassroomDTO } from "../../Core/src/modules/classrooms/dtos/ICreateClassroomDTO";

interface ICreateClassroomEscolaDTO extends ICreateClassroomDTO{
    professor_id: string;
} 
export {ICreateClassroomEscolaDTO}