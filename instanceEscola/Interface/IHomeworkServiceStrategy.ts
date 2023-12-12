import { ICreateHomeworkEscolaDTO } from "../dtos/ICreateHomeworkEscolaDTO";
import { IRequestAnswerHomeworkEscola } from "./IRequestAnswerHomeworkEscola";
import { IRequestGiveFeedbackHomeworkEscola } from "./IRequestGiveFeedbackEscola";
import { IRequestGiveGradeHomeworkEscola } from "./IRequestGiveGradeEscola";

export interface IHomeworkServiceStrategy {
  validateCreate(data:ICreateHomeworkEscolaDTO): Promise<boolean>;
  validateAnswerHomework(data:IRequestAnswerHomeworkEscola): Promise<boolean>;
  validateGiveFeedback(data:IRequestGiveFeedbackHomeworkEscola): Promise<boolean>;
  validateGiveGrade(data:IRequestGiveGradeHomeworkEscola): Promise<boolean>;
}