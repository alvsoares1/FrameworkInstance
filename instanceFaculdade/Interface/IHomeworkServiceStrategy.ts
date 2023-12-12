import { ICreateHomeworkFaculdadeDTO } from '../dtos/ICreateHomeworkFaculdadeDTO';
import { IRequestAnswerHomeworkFaculdade } from './IRequestAnswerHomeworkFaculdade';
import { IRequestGiveFeedbackHomeworkFaculdade } from './IRequestGiveFeedbackFaculdade';
import { IRequestGiveGradeHomeworkFaculdade } from './IRequestGiveGradeFaculdade';

export interface IHomeworkServiceStrategy {
  validateCreate(data:ICreateHomeworkFaculdadeDTO): Promise<boolean>;
  validateAnswerHomework(data:IRequestAnswerHomeworkFaculdade): Promise<boolean>;
  validateGiveFeedback(data:IRequestGiveFeedbackHomeworkFaculdade): Promise<boolean>;
  validateGiveGrade(data:IRequestGiveGradeHomeworkFaculdade): Promise<boolean>;
}