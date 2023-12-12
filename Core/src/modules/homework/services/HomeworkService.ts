import {Homework} from '../entities/Homework';
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework"
import { IRequestAnswerHomework } from '../interfaces/IRequestAnswerHomework';

abstract class HomeworkService {
    abstract create({ name, details, creator_id }: ICreateHomeworkDTO): Promise<Homework>;
    abstract giveFeedback({homework_id, team_id, feedback}: IRequestGiveFeedbackHomework ): Promise<Homework>;
    abstract answerHomework({homework_id, team_id, answer}: IRequestAnswerHomework): Promise<Homework>;
  }
  
  export { HomeworkService };