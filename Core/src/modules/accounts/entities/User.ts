import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  password: string;
  
  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  role: number;

  @Column()
  registration: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };