import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";

export class Auth {
  public static async authenticate(req: Request, res: Response, next: any) {
    try {
      let token = req.header("Authorization");
      let decoded = jwt.verify(token, "someSecretKey");
      req.user = decoded;
      next();
    }
    catch (err) {
      console.log(err);
      return res.status(401).send("Access Denied");
    }
  }
}