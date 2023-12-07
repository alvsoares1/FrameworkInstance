import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import auth from "../../../config/auth";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IRequestAuthenticate } from "../interfaces/IRequestAuthenticate";
import { IResponseAuthenticate } from "../interfaces/IResponseAuthenticate";
import { AppError } from "../../../shared/errors/AppError";
import { IDateProvider } from "../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";

const EMAIL_OR_PASSWORD_INCORRECT_MSG: string = "Email or password incorrect";

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async authenticate({ email, password }: IRequestAuthenticate): Promise<IResponseAuthenticate> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(EMAIL_OR_PASSWORD_INCORRECT_MSG);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(EMAIL_OR_PASSWORD_INCORRECT_MSG);
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      refresh_token,
      user_id: user.id,
      expires_date: refresh_token_expires_date,
    });
    
    const responseToken: IResponseAuthenticate = {
      user: {
        fullname: user.fullname,
        email: user.email,
      },
      token, 
      refresh_token,
    };

    return responseToken;
  }
}

export { AuthenticateUserService };