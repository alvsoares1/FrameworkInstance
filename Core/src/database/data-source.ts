import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "../modules/accounts/entities/User"
import { Classroom } from "../modules/classrooms/entities/Classroom"
import { UserTokens } from "../modules/accounts/entities/UserTokens"
import { CreateUsersTable1695281639949 } from "./migrations/1695281639949-CreateUsersTable"
import { CreateClassroomsTable1695903687240 } from "./migrations/1695903687240-CreateClassroomsTable"
import { CreateUsersTokensTable1698006547888 } from "./migrations/1698006547888-CreateUsersTokensTable"
import { CreateClassroomsUsersTable1698142184197 } from "./migrations/1698142184197-CreateClassroomsUsersTable"
import { CreateClassroomTeamTable1698162930395 } from "./migrations/1698162930395-CreateClassroomTeamTable"
import { CreateClassroomTeamsUsersTable1698162939369 } from "./migrations/1698162939369-CreateClassroomTeamsUsersTable"
import { ClassroomTeam } from "../modules/classrooms/entities/ClassroomTeam"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "teammate",
  synchronize: false,
  logging: false,
  entities: [User, UserTokens, Classroom, ClassroomTeam],
  migrations: [
    CreateUsersTable1695281639949, 
    CreateUsersTokensTable1698006547888, 
    CreateClassroomsTable1695903687240,
    CreateClassroomsUsersTable1698142184197,
    CreateClassroomTeamTable1698162930395,
    CreateClassroomTeamsUsersTable1698162939369,
  ],
  subscribers: [],
})
