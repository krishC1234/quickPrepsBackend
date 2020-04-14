import { Router } from "express";
import { TestController } from "../controllers/testController";

export var TestApp: Router = Router();

TestApp.post("/book", TestController.createTest);
TestApp.post("/start", TestController.start);
TestApp.post("/submit", TestController.submit);