import { Router } from "express";

import { RefreshTokenController } from "../modules/accounts/controllers/RefreshTokenController";
import { AuthenticateUserController } from "../modules/accounts/controllers/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.authenticate);
authenticateRoutes.post("/refresh-token", refreshTokenController.refresh);

export { authenticateRoutes };
