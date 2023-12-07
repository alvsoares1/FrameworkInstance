import { UserTokens } from "../entities/UserTokens";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens | null>;
}

export { IUsersTokensRepository };