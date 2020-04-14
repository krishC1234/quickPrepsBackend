import * as express from "express";
import { QuestionApp } from '../routes/questionApp';
import { UserController } from '../controllers/userController';
import { Auth } from '../middlewares/auth';
import { TestApp } from "../routes/testApp";
import * as fileUpload from "express-fileupload";
import { S3Service } from "../utils/s3Service";

export class Routes {
  public static registerRoutes(app: express.application) {

    app.use(fileUpload());
    app.use("/questions", Auth.authenticate, QuestionApp);
    // app.use("/user", UserApp);

    app.post("/login", UserController.login);
    // app.post("/register", UserController.register);

    app.use("/tests", TestApp);

    app.use('/upload', S3Service.upload);
  }
}