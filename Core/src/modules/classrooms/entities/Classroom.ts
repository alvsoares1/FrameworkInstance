import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { User } from "../../accounts/entities/User";

@Entity("classrooms")
class Classroom {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  professor_id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "classrooms_users",
    joinColumns: [{ name: "classroom_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  members: User[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Classroom };