import { Router } from "express";

import { ensureProfessor } from "../middlewares/ensureProfessor";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ClassrooomController } from "../modules/classrooms/controllers/ClassroomController";
import { ClassroomTeamController } from "../modules/classrooms/controllers/ClassroomTeamController";

const classroomsRoutes = Router();

const classroomController = new ClassrooomController();
const classroomTeamController = new ClassroomTeamController();

classroomsRoutes.post(
  "/", 
  ensureAuthenticated, 
  ensureProfessor, 
  classroomController.create
);

classroomsRoutes.get(
  "/:id",
  ensureAuthenticated,
  classroomController.details
);

classroomsRoutes.post(
  "/:id/teams",
  ensureAuthenticated,
  classroomTeamController.create
);

classroomsRoutes.get(
  "/:id/teams/:team_id",
  ensureAuthenticated,
  classroomTeamController.details
);

classroomsRoutes.post(
  "/:id/teams/join",
  ensureAuthenticated,
  classroomTeamController.join
);

classroomsRoutes.post(
  "/join",
  ensureAuthenticated,
  classroomController.join
);

export { classroomsRoutes }; 