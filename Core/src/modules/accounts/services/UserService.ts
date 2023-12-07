import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { AppError } from '../../../shared/errors/AppError';

@injectable()
class UserService {
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) {}

  async create({
    fullname,
    password,
    email, 
    gender,
    role,
    registration,
  }: ICreateUserDTO): Promise<void> {
    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email);
    const userWithRegistrationAlreadyExists = 
      await this.usersRepository.findByRegistration(registration);

    if (userWithEmailAlreadyExists) {
      throw new AppError("Já existe um usuário com esse email!");
    }

    if (userWithRegistrationAlreadyExists) {
      throw new AppError("Já existe um usuário com essa matrícula!");
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      fullname,
      password: hashedPassword,
      email,
      gender,
      role,
      registration,
    });
  }
}

export { UserService };