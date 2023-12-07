import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;
  
  findByRegistration(registration: string): Promise<User | null>;
}

export { IUsersRepository };