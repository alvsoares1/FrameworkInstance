import { IRequestGiveFeedbackHomework } from "../../src/modules/homework/interfaces/IRequestGiveFeedbackHomework";

interface IRequestGiveFeedbackHomeworkFaculdade extends IRequestGiveFeedbackHomework{
    professor_id: string;
} 
export {IRequestGiveFeedbackHomeworkFaculdade}