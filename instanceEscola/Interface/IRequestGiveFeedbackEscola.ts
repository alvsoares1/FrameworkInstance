import { IRequestGiveFeedbackHomework } from "../../src/modules/homework/interfaces/IRequestGiveFeedbackHomework";

interface IRequestGiveFeedbackHomeworkEscola extends IRequestGiveFeedbackHomework{
    professor_id: string;
} 
export {IRequestGiveFeedbackHomeworkEscola}