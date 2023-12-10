import {Homework} from '../entities/Homework';
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework"

abstract class HomeworkService {
    abstract create({ name, details, creator_id }: ICreateHomeworkDTO): Promise<Homework>;
    abstract assign({ name, team_id }: IRequestAssignHomework): Promise<Homework>;
    abstract giveFeedback({name, team_id, feedback}: IRequestGiveFeedbackHomework ): Promise<Homework>;
  }
  
  export { HomeworkService };