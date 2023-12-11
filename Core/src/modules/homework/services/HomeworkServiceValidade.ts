import {Homework} from '../entities/Homework';
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework";
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";

export interface HomeworkServiceValidate {
    create(data: ICreateHomeworkDTO): Promise<Homework>;
    assign(data: IRequestAssignHomework): Promise<Homework>;
    giveFeedback(data: IRequestGiveFeedbackHomework): Promise<Homework>;
}