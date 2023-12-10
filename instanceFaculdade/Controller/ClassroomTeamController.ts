import { Request, Response } from "express";
import { container } from "tsyringe";
import {ClassroomTeamValidateFaculdade} from '../Service/ClassroomTeamValidateFaculdade'
import { ClassroomTeamServiceFaculdade } from "../Service/ClassroomTeamService";
import {ClassroomTeamController} from '../../Core/src/modules/classrooms/controllers/ClassroomTeamController'

class ClassroomTeamControllerFaculdade extends ClassroomTeamController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id: classroom_id } = request.params;
    const { name } = request.body;
    const { id: creator_id } = request.user;

    const classroomTeamService = container.resolve(ClassroomTeamServiceFaculdade);

    const classroomTeam = await classroomTeamService.create({
      classroom_id,
      name,
      creator_id,
    });

    return response.status(201).json(classroomTeam);
  }

  async join(request: Request, response: Response): Promise<Response> {
    const { team_id } = request.body;
    const { id: user_id } = request.user;
    
    const classroomTeamService = container.resolve(ClassroomTeamServiceFaculdade);

    const classroomTeam = await classroomTeamService.join({
      team_id,
      user_id,
    });

    return response.json(classroomTeam);
  }

  async details(request: Request, response: Response): Promise<Response> {
    const { team_id } = request.params;

    const classroomTeamService = container.resolve(ClassroomTeamServiceFaculdade);

    const classroomTeam = await classroomTeamService.details(team_id);

    return response.json(classroomTeam);
  }
}

export { ClassroomTeamControllerFaculdade }; 