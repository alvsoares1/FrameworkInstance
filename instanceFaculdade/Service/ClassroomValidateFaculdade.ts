import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { IClassroomServicesStrategy } from "../interfaces/IClassroomServicesStrategy";
import { inject, injectable } from "tsyringe";
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";
import { IUsersRepository } from "../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class ClassroomValidateFaculdade implements IClassroomServicesStrategy {
    constructor(
        @inject("ClassroomsRepository")
        private classroomsRepository: IClassroomsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async validateCreate({professor_id }: ICreateClassroomDTO): Promise<boolean> {
        const professor = await this.usersRepository.findById(professor_id);

        if (!professor || professor.role !== 2) {
            throw new AppError("Invalid professor!", 400);
        }
        return true;
    }
}

export { ClassroomValidateFaculdade };
