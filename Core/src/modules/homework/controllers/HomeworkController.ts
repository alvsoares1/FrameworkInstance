import { Request, Response } from "express";
import { container } from "tsyringe";

abstract class HomeworkController {
  abstract create(request: Request, response: Response): Promise<Response>;
  abstract giveFeedback(request: Request, response: Response): Promise<Response>;
  abstract answerHomework(request: Request, response: Response): Promise<Response>;
}

export { HomeworkController };