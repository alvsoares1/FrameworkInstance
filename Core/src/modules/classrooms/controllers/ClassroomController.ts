import { Request, Response } from "express";
import { container } from "tsyringe";
import { ClassroomService } from "../services/ClassroomService";

abstract class ClassrooomController {
  abstract  create(request: Request, response: Response): Promise<Response>;
  abstract  join(request: Request, response: Response): Promise<Response>;
  abstract  details(request: Request, response: Response): Promise<Response>;
}

export { ClassrooomController };