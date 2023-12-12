import { Request, Response } from "express";
import { container } from "tsyringe";
import { ClassroomServiceFaculdade } from "../Service/ClassroomService";
import {ClassrooomController} from '../../Core/src/modules/classrooms/controllers/ClassroomController'

class ClassrooomControllerFaculdade extends ClassrooomController{
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { id } = request.user;

    const classroomService = container.resolve(ClassroomServiceFaculdade);

    const classroom = await classroomService.create({
      name, 
      description,
      professor_id: id,
    });

    return response.status(201).json(classroom);
  }
}

export { ClassrooomControllerFaculdade };