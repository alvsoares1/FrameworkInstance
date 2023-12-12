import {Homework} from '../entities/Homework';
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework"
import { IRequestAnswerHomework } from '../interfaces/IRequestAnswerHomework';
import { inject } from 'tsyringe';
import { IHomeworkRepository } from '../repositories/IHomeworkRepository';
import { IClassroomTeamsRepository } from '../../classrooms/repositories/IClassroomTeamsRepository';
import { AppError } from '../../../shared/errors/AppError';

class HomeworkService {
  constructor(
    @inject('HomeworkRepository')
    protected homeworkRepository: IHomeworkRepository,
    @inject('ClassroomTeamsRepository')
    protected classroomTeamsRepository: IClassroomTeamsRepository,
){}

async create({name, details, creator_id}: ICreateHomeworkDTO): Promise<Homework>{
    const homework: Homework = await this.homeworkRepository.create({
        name,
        details,
        creator_id
    });
    return homework;
}

async giveFeedback({homework_id, team_id, feedback}: IRequestGiveFeedbackHomework): Promise<Homework>{
    const team = await this.classroomTeamsRepository.findById(team_id);
    if (!team) {
        throw new AppError("Invalid team!", 400);
    }

    const homework = await this.homeworkRepository.findById(homework_id);
    if(!homework){
        throw new AppError("Invalid Homework!", 400)
    }

    const identifiedFeedback: string = `${team_id}_${feedback}`;

    homework.feedback.push(identifiedFeedback);

    return homework;

}

async answerHomework({ homework_id, team_id, answer }: IRequestAnswerHomework): Promise<Homework> {
    const homework = await this.homeworkRepository.findById(homework_id);
    if (!homework){
        throw new AppError('Homework not found!', 404);
    }

    const identifiedAnswer: string = `${team_id}_${answer}`;

    homework.replies.push(identifiedAnswer);

    return homework;
}
  }
  
  export { HomeworkService };