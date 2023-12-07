import { container } from "tsyringe";

import "./providers";

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IClassroomsRepository } from "../../modules/classrooms/repositories/IClassroomsRepository";
import { ClassroomsRepository } from "../../modules/classrooms/repositories/implementations/ClassroomsRepository";
import { UsersTokensRepository } from "../../modules/accounts/repositories/implementations/UsersTokensRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { IClassroomTeamsRepository } from "../../modules/classrooms/repositories/IClassroomTeamsRepository";
import { ClassroomTeamsRepository } from "../../modules/classrooms/repositories/implementations/ClassroomTeamsRepository";
import {ClassroomValidateFaculdade} from '../../modules/classrooms/services/ClassroomValidateFaculdade'
import {IClassroomServicesStrategy} from '../../modules/classrooms/interfaces/IClassroomServicesStrategy'
import {IClassroomTeamServiceStrategy} from "../../modules/classrooms/interfaces/IClassRoomTeamServicesStrategy"
import {ClassroomTeamValidateFaculdade} from "../../modules/classrooms/services/ClassroomTeamValidateFaculdade"

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClassroomsRepository>(
  "ClassroomsRepository",
  ClassroomsRepository
);

container.registerSingleton<IClassroomTeamsRepository>(
  "ClassroomTeamsRepository",
  ClassroomTeamsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IClassroomServicesStrategy>(
  "ClassroomValidateFaculdade",
  ClassroomValidateFaculdade
);

container.registerSingleton<IClassroomTeamServiceStrategy>( 
  "ClassroomTeamValidateFaculdade",
  ClassroomTeamValidateFaculdade
)