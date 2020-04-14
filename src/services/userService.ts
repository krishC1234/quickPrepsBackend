import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from '../models/user';
import { ResponseModel } from '../models/DTOs/responseModel';
import { MongoErrorHandler } from '../helpers/mongoErrorHandler';
import { DbModels } from '../models/dbModels/dbModels';

export class UserService {
  // public static async login(data: User): Promise<ResponseModel> {
  //   try {
  //     let tokenPayload = {
  //       _id: data._id,
  //       name: data.name,
  //       mobile: data.mobile
  //     }

  //     let token = jwt.sign(tokenPayload, "secretKey", { expiresIn: "24h" });
  //     return ResponseModel.getValidResponse(token);
  //   }

  //   catch (err) {
  //     return MongoErrorHandler.handleError(err);
  //   }
  // }

  public static async getAll(): Promise<ResponseModel> {
    try {
      let users = await DbModels.UserModel.find();
      return ResponseModel.getValidResponse(users);
    }
    catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async create(data: User): Promise<ResponseModel> {
    try {
      let newUser = await DbModels.UserModel(data);
      await newUser.save();

      return ResponseModel.getValidResponse(newUser);
    }
    catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async findByMobile(mob: string): Promise<any> {
    let user = await DbModels.UserModel.findOne({ mobile: mob });
    return user;
  }
}