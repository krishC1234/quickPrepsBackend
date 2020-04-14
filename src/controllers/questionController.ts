import { Request, Response } from "express";
import { QuestionService } from '../services/questionService';
import { ResponseModel } from '../models/DTOs/responseModel';
import { Question } from '../models/question';
import { testSchema } from '../models/dbModels/schemas/testSchema';

export class QuestionController {

  public static async create(req: Request, res: Response): Promise<void> {
    let question: Question = new Question(req.body);

    let response: ResponseModel = await QuestionService.create(question);
    res.json(response);
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    let response: ResponseModel = await QuestionService.getAll();
    res.json(response);
  }

  public static async get(req: Request, res: Response): Promise<void> {
    let response: ResponseModel = await QuestionService.get(req.params.id);
    res.json(response);
  }

  public static async getType(req: Request, res: Response): Promise<void> {
    console.log(req.body);

    let type: string = req.body.type;
    console.log(type);
    let response: ResponseModel = await QuestionService.getType(type);
    res.json(response);
  }

  public static async update(req: Request, res: Response): Promise<void> {
    let question: Question = new Question(req.body);
    let response: ResponseModel = await QuestionService.update(question);
    res.json(response);
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    let response: ResponseModel = await QuestionService.remove(req.params.id);
    res.json(response);
  }

}
