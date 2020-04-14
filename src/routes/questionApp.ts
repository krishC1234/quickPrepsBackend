import { Router } from "express";
import { QuestionController } from '../controllers/questionController';

export var QuestionApp: Router = Router();

QuestionApp.get("/", QuestionController.getAll);

QuestionApp.post("/type", QuestionController.getType);

QuestionApp.get("/:id", QuestionController.get);
QuestionApp.post("/", QuestionController.create);
QuestionApp.put("/", QuestionController.update);
QuestionApp.delete("/:id", QuestionController.remove);