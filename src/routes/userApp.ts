import { Router } from "express";
import { UserController } from '../controllers/userController';

export var UserApp: Router = Router();

UserApp.get("/", UserController.getAll);
UserApp.post("/", UserController.create);