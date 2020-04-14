import { User } from '../models/user';
import { ResponseModel } from '../models/DTOs/responseModel';
import { UserService } from '../services/userService';
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export class UserController {

  public static secretKey: string = "someSecretKey";
  private static user: User;

  public static async login(req: Request, res: Response) {
    // Generate Token
    console.log(req.body);
    if (req.body.mobile != "6504452674" || req.body.password != "password") {
      return res.send(ResponseModel.getInvalidResponse(["Either phone number or password is wrong"]));
    }

    let token = jwt.sign(req.body, UserController.secretKey, { expiresIn: '1h' });
    return res.send(ResponseModel.getValidResponse(token));
  }

  public static async dummyLogin(req: Request, res: Response) {
    // Generate Token
    if (req.body.mobile != "9999999999" || req.body.password != "password") {
      return res.send(ResponseModel.getInvalidResponse(["Either phone number or password is wrong"]));
    }

    let token = jwt.sign(req.body, UserController.secretKey, { expiresIn: '1h' });
    return res.send(ResponseModel.getValidResponse(token));
  }

  public static async signup(req: Request, res: Response) {
    // check user
    if (UserController.user != null) {
      return res.send(ResponseModel.getInvalidResponse(["Not Implemented"]));
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {

    let user: User = new User(req.body);

    let response: ResponseModel = await UserService.create(user);
    res.json(response);
  }


  public static async getAll(req: Request, res: Response): Promise<void> {

    let user: User = new User(req.body);

    let response: ResponseModel = await UserService.getAll();
    res.json(response);
  }
}