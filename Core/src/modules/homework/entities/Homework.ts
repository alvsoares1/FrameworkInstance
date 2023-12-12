import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("homeworks")
class Homework {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  team_id: string;

  @Column('homework_feedback', { array: true, default: [] })
  feedback: string[];

  @Column('homework_grades', { array: true, default: [] })
  grade: string[];

  @Column()
  details: string;

  @Column()
  creator_id: string;

  @Column('homework_replies', { array: true, default: [] })
  replies: string[];

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Homework };