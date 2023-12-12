import { IHomeworkServiceStrategy } from "../Interface/IHomeworkServiceStrategy";
import { inject, injectable } from "tsyringe";
import { IHomeworkRepository } from "../../src/modules/homework/repositories/IHomeworkRepository";
import { IClassroomTeamsRepository } from "../../src/modules/classrooms/repositories/IClassroomTeamsRepository";
import { AppError } from '../../src/shared/errors/AppError';
import { IUsersRepository } from '../../src/modules/accounts/repositories/IUsersRepository';
import { ICreateHomeworkEmpresaDTO } from "../dtos/ICreateHomeworkEmpresaDTO";
import { IRequestGiveFeedbackHomeworkEmpresa } from "../Interface/IRequestGiveFeedbackEmpresa";
import { IRequestAnswerHomeworkEmpresa } from "../Interface/IRequestAnswerHomeworkEmpresa";

@injectable()
class HomeworkValidateEmpresa implements IHomeworkServiceStrategy {
    constructor(
        @inject("HomeworkRepository")
        private homeworkRepository: IHomeworkRepository,
        @inject("ClassroomTeamsRepository")
        private classroomTeamsRepository: IClassroomTeamsRepository,
        @inject("ClassroomRepository")
        private classroomRepository: IClassroomTeamsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    

    async validateCreate({name, details, creator_id}: ICreateHomeworkEmpresaDTO): Promise<boolean> {
        const professor = await this.usersRepository.findById(creator_id);

        if (!professor || professor.role !== 2) {
            throw new AppError("Invalid professor!", 400);
        }
        return true;
    }

    async validateGiveFeedback({homework_id, team_id, feedback, manager_id}: IRequestGiveFeedbackHomeworkEmpresa): Promise<boolean> {
        const homework = await this.homeworkRepository.findById(homework_id);
        if(!homework){
            throw new AppError("Invalid Homework!", 400)
        }

        const professor = await this.usersRepository.findById(manager_id);
        if (!professor || professor.role !== 2) {
            throw new AppError("Invalid professor!", 400);
        }
        return true;
    }

    async validateAnswerHomework({homework_id, team_id, answer}: IRequestAnswerHomeworkEmpresa): Promise<boolean> {
        const team = await this.classroomTeamsRepository.findById(team_id);
        if (!team) {
            throw new AppError("Invalid team!", 400);
        }
        return true;
    }
}

export { HomeworkValidateEmpresa };