import { ICreateHomeworkDTO } from "../../src/modules/homework/dtos/ICreateHomeworkDTO";

interface ICreateHomeworkFaculdadeDTO extends ICreateHomeworkDTO{
    grade?: string;
} 
export {ICreateHomeworkFaculdadeDTO}