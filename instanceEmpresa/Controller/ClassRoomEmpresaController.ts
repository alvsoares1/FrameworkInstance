import { Request, Response } from "express";
import { ClassroomServiceEmpresa } from "../Service/ClassRoomEmpresaService"
import { ClassrooomController } from '../../Core/src/modules/classrooms/controllers/ClassroomController';

class ClassrooomControllerEmpresa extends ClassrooomController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { id } = request.user;

    const classroomService = container.resolve(ClassroomServiceEmpresa);

    const classroom = await this.classroomService.create({
      name,
      description,
      maneger_id: id,
    });

    return response.status(201).json(classroom);
  }

  async join(request: Request, response: Response): Promise<Response> {
    const { classroom_id } = request.body;
    const { id } = request.user;

    const classroom = await this.classroomService.join({
      classroom_id,
      user_id: id,
    });

    return response.json(classroom);
  }
}

export { ClassrooomControllerEmpresa };