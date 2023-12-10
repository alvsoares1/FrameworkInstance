import { ICreateClassroomEmpresaDTO } from "../dtos/ICreateClassroomDTO";
import { IClassroomServicesStrategy } from "../interfaces/IClassroomServicesStrategy";
import { inject, injectable } from "tsyringe";
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";
import { IUsersRepository } from "../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class ClassroomValidateEmpresa implements IClassroomServicesStrategy {
    constructor(
        @inject("ClassroomsRepository")
        private classroomsRepository: IClassroomsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async validateCreate({maneger_id }: ICreateClassroomEmpresaDTO): Promise<boolean> {
        const manager = await this.usersRepository.findById(professor_id);

        if (!manager || manager.role !== 2) {
            throw new AppError("Invalid professor!", 400);
        }
        return true;
    }
}

export { ClassroomValidateEmpresa };
