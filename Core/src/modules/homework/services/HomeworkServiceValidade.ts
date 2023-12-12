import {Homework} from '../entities/Homework';
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework";
import { IRequestAnswerHomework } from '../interfaces/IRequestAnswerHomework';

export interface HomeworkServiceValidate {
    create(data: ICreateHomeworkDTO): Promise<Homework>;
    giveFeedback(data: IRequestGiveFeedbackHomework): Promise<Homework>;
    answerHomework(data: IRequestAnswerHomework): Promise<Homework>;
}