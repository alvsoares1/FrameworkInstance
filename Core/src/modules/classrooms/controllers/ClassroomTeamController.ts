import { Request, Response } from "express";
import { container } from "tsyringe";
import { ClassroomTeamService } from "../services/ClassroomTeamService";

abstract class ClassroomTeamController {
  abstract create(request: Request, response: Response): Promise<Response>;
  abstract join(request: Request, response: Response): Promise<Response>;
  abstract details(request: Request, response: Response): Promise<Response>;
}

export { ClassroomTeamController }; 