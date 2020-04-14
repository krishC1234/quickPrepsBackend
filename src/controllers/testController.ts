import { Test } from "../models/test";
import { ResponseModel } from '../models/DTOs/responseModel';
import { TestService } from "../services/testService";
import { Request, Response } from "express";
import { TestCreateRequest } from "../models/DTOs/testCreateRequest"


export class TestController {
  public static async createTest(req: Request, res: Response): Promise<void> {
    let testRequest: TestCreateRequest = new TestCreateRequest(req.body);

    let response: ResponseModel = await TestService.createTest(testRequest);
    res.json(response);
  }

  public static async start(req: Request, res: Response): Promise<void> {
    //let test: Test = new Test(req.body);
    let testRequest: TestCreateRequest = new TestCreateRequest(req.body);
    console.log(req.body);

    let response: ResponseModel = await TestService.resumeTest(req);
    res.json(response);
  }

  public static async submit(req: Request, res: Response): Promise<void> {
    let testRequest: TestCreateRequest = new TestCreateRequest(req.body);

    let response: ResponseModel = await TestService.submitAnswer(req);
    res.json(response);
  }
}