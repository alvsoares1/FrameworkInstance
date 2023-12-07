import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../accounts/entities/User";

@Entity("teams")
class ClassroomTeam {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  classroom_id: string;

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
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ClassroomTeam };