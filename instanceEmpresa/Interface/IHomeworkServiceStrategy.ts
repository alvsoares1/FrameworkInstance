import { ICreateHomeworkEmpresaDTO } from '../dtos/ICreateHomeworkEmpresaDTO';
import { IRequestAnswerHomeworkEmpresa } from './IRequestAnswerHomeworkEmpresa';
import { IRequestGiveFeedbackHomeworkEmpresa } from './IRequestGiveFeedbackEmpresa';

export interface IHomeworkServiceStrategy {
  validateCreate(data:ICreateHomeworkEmpresaDTO): Promise<boolean>;
  validateAnswerHomework(data:IRequestAnswerHomeworkEmpresa): Promise<boolean>;
  validateGiveFeedback(data:IRequestGiveFeedbackHomeworkEmpresa): Promise<boolean>;
}