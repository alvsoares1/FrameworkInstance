import { Homework } from "../../src/modules/homework/entities/Homework";
import { IHomeworkServiceStrategy } from "../Interface/IHomeworkServiceStrategy";
import { inject, injectable } from "tsyringe";
import { AppError } from '../../src/shared/errors/AppError';
import { IHomeworkRepository } from "../../src/modules/homework/repositories/IHomeworkRepository";
import { IClassroomTeamsRepository } from "../../src/modules/classrooms/repositories/IClassroomTeamsRepository";
import { IRequestGiveFeedbackHomework } from "../../src/modules/homework/interfaces/IRequestGiveFeedbackHomework";
import { HomeworkService } from "../../src/modules/homework/services/HomeworkService";
import { ICreateHomeworkFaculdadeDTO } from "../dtos/ICreateHomeworkFaculdadeDTO";
import { IRequestAnswerHomework } from "../../src/modules/homework/interfaces/IRequestAnswerHomework";
import { IRequestGiveGradeHomeworkFaculdade } from "../Interface/IRequestGiveGradeFaculdade";

@injectable()
class HomeworkServiceFaculdade extends HomeworkService{
    constructor(
        @inject('HomeworkRepository')
        private homeworkRepository: IHomeworkRepository,
        @inject('ClassroomTeamsRepository')
        private classroomTeamsRepository: IClassroomTeamsRepository,
        @inject("ClassroomRepository")
        private classroomRepository: IClassroomTeamsRepository,
        @inject("HomeworkValidateFaculdade")
        private validateHomeworkServiceStrategy: IHomeworkServiceStrategy
    ){
        super();
    }

    async create({name, details, creator_id}: ICreateHomeworkFaculdadeDTO): Promise<Homework>{
        const isValidationPassed = await this.validateHomeworkServiceStrategy.validateCreate({name, details, creator_id});

        if (isValidationPassed) {
            const homework: Homework = await this.homeworkRepository.create({
                name,
                details,
                creator_id
            });
            return homework;
            
          }else {
            throw new AppError("Validation failed", 400);
          }
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

        const professor_id = homework.creator_id;

        const isValidationPassed = await this.validateHomeworkServiceStrategy.validateGiveFeedback({homework_id, team_id, feedback, professor_id});
        
        if (isValidationPassed) {
            const identifiedFeedback: string = `${team_id}_${feedback}`;

            homework.feedback.push(identifiedFeedback);

            return homework;
            
        } else {
            throw new AppError("Validation failed", 400);
        }
    }

    async answerHomework({ homework_id, team_id, answer }: IRequestAnswerHomework): Promise<Homework> {
        const homework = await this.homeworkRepository.findById(homework_id);
        if (!homework){
            throw new AppError('Homework not found!', 404);
        }

        const isValidationPassed = await this.validateHomeworkServiceStrategy.validateAnswerHomework({homework_id, team_id, answer});
        if (isValidationPassed) {
            const identifiedAnswer: string = `${team_id}_${answer}`;

            homework.replies.push(identifiedAnswer);

            return homework;
        } else {
            throw new AppError("Validation failed", 400);
        }
    }

    async giveGrade({homework_id, team_id, grade}: IRequestGiveGradeHomeworkFaculdade): Promise<Homework>{
        const team = await this.classroomTeamsRepository.findById(team_id);
        if (!team) {
            throw new AppError("Invalid team!", 400);
        }

        const homework = await this.homeworkRepository.findById(homework_id);
        if(!homework){
            throw new AppError("Invalid Homework!", 400)
        }

        const professor_id = homework.creator_id;

        const isValidationPassed = await this.validateHomeworkServiceStrategy.validateGiveGrade({homework_id, team_id, grade, professor_id});
        
        if (isValidationPassed) {
            const identifiedFeedback: string = `${team_id}_${grade}`;

            homework.grade.push(identifiedFeedback);

            return homework;
            
        } else {
            throw new AppError("Validation failed", 400);
        }
    }
}

export{HomeworkServiceFaculdade};