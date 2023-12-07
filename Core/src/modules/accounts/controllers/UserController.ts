import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { 
      fullname, 
      password, 
      email, 
      gender, 
      role, 
      registration 
    } = request.body;
    
    const userService = container.resolve(UserService);

    await userService.create({
      fullname,
      password,
      email,
      gender,
      role,
      registration,
    });

    return response.status(201).send();
  }
}

export { UserController };