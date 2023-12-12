// import { Repository } from "typeorm";

// import { ClassroomTeam } from "../../Core/src/modules/classrooms/entities/ClassroomTeam";
// import { ICreateClassroomTeamFaculdadeDTO } from "../dtos/ICreateClassroomTeamFaculdadeDTO";
// import { IClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/IClassroomTeamsRepository";
// import { AppDataSource } from "../../Core/src/database/data-source";
// import { ClassroomTeamsRepository } from "../../Core/src/modules/classrooms/repositories/implementations/ClassroomTeamsRepository";

// class ClassroomTeamsRepositoryFaculdade extends ClassroomTeamsRepository implements IClassroomTeamsRepository {
//   private repository: Repository<ClassroomTeam>;

//   constructor() {
//     super();
//     this.repository = AppDataSource.getRepository(ClassroomTeam);
//   }
  
//   async create({ name, classroom_id, creator_id }: ICreateClassroomTeamFaculdadeDTO): Promise<ClassroomTeam> {
//     const classroomTeam = this.repository.create({
//       name,
//       classroom_id,
//       creator_id,
//     });

//     await this.repository.save(classroomTeam);

//     return classroomTeam
//   }

//   async findById(id: string): Promise<ClassroomTeam | null> {
//     const classroomTeam = this.repository.findOneBy({ id });
//     return classroomTeam;
//   }

// }

// export { ClassroomTeamsRepositoryFaculdade };