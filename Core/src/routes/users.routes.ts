import { Router } from "express";

import { UserController } from "../modules/accounts/controllers/UserController";

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post("/", userController.create);

export { usersRoutes }; 