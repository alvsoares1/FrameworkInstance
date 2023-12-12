import { IRequestGiveFeedbackHomework } from "../../src/modules/homework/interfaces/IRequestGiveFeedbackHomework";

interface IRequestGiveFeedbackHomeworkEmpresa extends IRequestGiveFeedbackHomework{
    manager_id: string;
} 
export {IRequestGiveFeedbackHomeworkEmpresa}