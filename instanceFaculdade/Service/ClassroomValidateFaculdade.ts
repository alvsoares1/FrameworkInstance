import {ICreateClassroomFaculdadeDTO} from '../dtos/ICreateClassroomFaculdadeDTO'
import { IClassroomServicesStrategy } from "../Interface/IClassroomServicesStrategy";
import { inject, injectable } from "tsyringe";
import { IClassroomsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomsRepository";
import { IUsersRepository } from "../../Core/src/modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../Core/src/shared/errors/AppError";

@injectable()
class ClassroomValidateFaculdade implements IClassroomServicesStrategy {
    constructor(
        @inject("ClassroomsRepository")
        private classroomsRepository: IClassroomsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async validateCreate({professor_id }: ICreateClassroomFaculdadeDTO): Promise<boolean> {
        const professor = await this.usersRepository.findById(professor_id);

        if (!professor || professor.role !== 2) {
            throw new AppError("Invalid professor!", 400);
        }
        return true;
    }
}

export { ClassroomValidateFaculdade };
