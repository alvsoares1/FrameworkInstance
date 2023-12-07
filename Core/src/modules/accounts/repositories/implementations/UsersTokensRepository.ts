import { Repository } from "typeorm";

import { UserTokens } from "../../entities/UserTokens";
import { AppDataSource } from "../../../../database/data-source";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";


class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    const usersTokens = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
  }
}

export { UsersTokensRepository };