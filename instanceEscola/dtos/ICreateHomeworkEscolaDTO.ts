import { ICreateHomeworkDTO } from "../../src/modules/homework/dtos/ICreateHomeworkDTO";

interface ICreateHomeworkEscolaDTO extends ICreateHomeworkDTO{
    grade?: string;
} 
export {ICreateHomeworkEscolaDTO}