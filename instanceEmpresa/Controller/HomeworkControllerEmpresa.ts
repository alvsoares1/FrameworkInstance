import {Request, Response} from "express";
import {container} from "tsyringe";
import {HomeworkController} from "../../src/modules/homework/controllers/HomeworkController";
import { HomeworkServiceEmpresa } from "../Service/HomeworkServiceEmpresa";

class HomeworkControllerEmpresa extends HomeworkController{
    async create(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;
        const {details} = request.body;
        const {id: creator_id} = request.user;

        const homeworkService = container.resolve(HomeworkServiceEmpresa);

        const homework = await homeworkService.create({
            name,
            details,
            creator_id,
        });

        return response.status(201).json(homework)
    }

}