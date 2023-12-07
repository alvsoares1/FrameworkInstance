import { container } from "tsyringe";
import { Request, Response } from "express";
import { RefreshTokenService } from "../services/RefreshTokenService";

class RefreshTokenController {
  async refresh(request: Request, response: Response): Promise<Response> {
    const token = 
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refresh_token = await refreshTokenService.refresh(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };