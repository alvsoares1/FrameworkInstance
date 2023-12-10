import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../Core/src/modules/accounts/entities/User";
import {ClassroomTeam} from '../../Core/src/modules/classrooms/entities/ClassroomTeam'

@Entity("teams")
class ClassroomTeamEmpresa extends ClassroomTeam{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  classroom_id: string;

  @Column()
  role: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: "classroomteams_users",
    joinColumns: [{ name: "team_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  members: User[];

  @Column()
  creator_id: string;

  constructor() {
    super();
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ClassroomTeamEmpresa };