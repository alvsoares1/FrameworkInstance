import { ICreateClassroomDTO } from "../../Core/src/modules/classrooms/dtos/ICreateClassroomDTO";

interface ICreateClassroomFaculdadeDTO extends ICreateClassroomDTO{
    professor_id: string;
} 
export {ICreateClassroomFaculdadeDTO}