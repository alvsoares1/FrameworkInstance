import { Request, Response } from "express";
import { container } from "tsyringe";
import { ClassroomTeamServiceEmpresa } from "../Service/ClassRoomTeamEmpresaService";
import { ClassroomTeamController } from '../../Core/src/modules/classrooms/controllers/ClassroomTeamController';

class ClassroomTeamEmpresaController extends ClassroomTeamController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id: classroom_id } = request.params;
    const { name } = request.body;
    const { id: creator_id } = request.user;
    const { role } = request.body;

    const classroomService = container.resolve(ClassroomTeamServiceEmpresa);

    const classroomTeam = await this.classroomService.create({
      classroom_id,
      name,
      creator_id,
      role,
    });

    return response.status(201).json(classroomTeam);
  }

}

export { ClassroomTeamEmpresaController };