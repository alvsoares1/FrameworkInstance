import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../accounts/entities/User";

@Entity("homeworks")
class Homework {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  team_id: string;

  @Column()
  feedback: string;

  @Column()
  details: string;

  @Column()
  creator_id: string;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Homework };