import {Request, Response} from "express";
import {container} from "tsyringe";
import {HomeworkController} from "../../src/modules/homework/controllers/HomeworkController";
import {HomeworkServiceFaculdade} from "../services/HomeworkService";

class HomeworkControllerFaculdade extends HomeworkController{
    async create(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;
        const {details} = request.body;
        const {id: creator_id} = request.user;

        const homeworkService = container.resolve(HomeworkServiceFaculdade);

        const homework = await homeworkService.create({
            name,
            details,
            creator_id,
        });

        return response.status(201).json(homework)
    }

    async giveFeedback(request: Request, response: Response): Promise<Response>{
        const {homework_id} = request.body;
        const {team_id} = request.body;
        const {feedback} = request.body;

        const homeworkService = container.resolve(HomeworkServiceFaculdade);

        const homework = await homeworkService.giveFeedback({
            homework_id,
            team_id,
            feedback,
        });

        return response.json(homework)
    }

    async answerHomework(request: Request, response: Response): Promise<Response>{
        const {id: homework_id} = request.body;
        const {id: team_id} = request.body;
        const {answer} = request.body;

        const homeworkService = container.resolve(HomeworkServiceFaculdade);

        const homework = await homeworkService.answerHomework({
            homework_id,
            team_id,
            answer,
        });

        return response.json(homework)
    }

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