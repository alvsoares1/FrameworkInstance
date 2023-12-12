import {Request, Response} from "express";
import {container} from "tsyringe";
import {HomeworkController} from "../../src/modules/homework/controllers/HomeworkController";
import {HomeworkServiceFaculdade} from "../Service/HomeworkService";

class HomeworkControllerFaculdade extends HomeworkController{
    

    async giveGrade(request: Request, response: Response): Promise<Response>{
        const {homework_id} = request.body;
        const {team_id} = request.body;
        const {grade} = request.body;
        const {professor_id} = request.body;

        const homeworkService = container.resolve(HomeworkServiceFaculdade);

        const homework = await homeworkService.giveGrade({
            homework_id,
            team_id,
            grade,
            professor_id,
        });

        return response.json(homework)
    }
}