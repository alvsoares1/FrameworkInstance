import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../config/auth";
import { IPayload } from "../interfaces/IPayload";
import { IResponseToken } from "../interfaces/IResponseToken";
import { AppError } from "../../../shared/errors/AppError";
import { IDateProvider } from "../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";

@injectable()
class RefreshTokenService {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async refresh(token: string): Promise<IResponseToken> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      refresh_token,
      expires_date,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenService };