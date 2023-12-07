import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { classroomsRoutes } from "./classrooms.routes";
import { authenticateRoutes } from "./authenticate.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/classrooms", classroomsRoutes);
routes.use(authenticateRoutes);

export { routes };