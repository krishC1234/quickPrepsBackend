import { ResponseModel } from "../models/DTOs/responseModel";
import { Request, Response } from "express";
import { Test } from "../models/test";
import { MongoErrorHandler } from '../helpers/mongoErrorHandler';
import { DbModels } from '../models/dbModels/dbModels';
import { Question } from "../models/question";
import { MailService } from "../utils/mailService";
import { TestCreateRequest } from "../models/DTOs/testCreateRequest";
import { TestStatus } from "../helpers/TestStatus";
import { ModelHelper } from "../helpers/modelHelper";
import { questionSchema } from "../models/dbModels/schemas/questionSchema";



export class TestService {

  //Inputs include: mobile, name, and email
  //Output includes: New test Id
  public static async createTest(data: TestCreateRequest): Promise<ResponseModel> {
    try {
      //Finds user with mobileNo in request
      let user = await DbModels.UserModel.findOne({ email: data.email });

      //Creates new user if no current user exists
      if (user == null) {
        user = new DbModels.UserModel();
        user.password = data.password;
        user.name = data.name;
        user.email = data.email;
        await user.save();
      }

      //Creates new test object and saves a user under it
      let newTest = await DbModels.TestModel();
      newTest.user = user;
      newTest.type = data.type;
      console.log(user);
      await newTest.save();

      MailService.sendWelcomeMail(newTest.user.name, newTest.user.email, newTest._id);

      return ResponseModel.getValidResponse(newTest._id);
    }
    catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  //Inputs include: Test Id, MobileNo
  //Outputs include: Test
  public static async resumeTest(req: Request): Promise<ResponseModel> {
    try {
      //Finds test through test id, and populates it with the current user
      let test = await DbModels.TestModel.findById(req.body._id).populate({ path: 'user', select: 'name email' });

      console.log("The database email is", test.user.email);
      console.log("The request email", req.body.email);
      //Checks to see if mobileNo or test id is incorrect
      if (!test || test.user.email != req.body.email) {
        return ResponseModel.getInvalidResponse(['Either the email or test code is incorrect']);
      }

      //Checks to see if test had been completed or expired
      if (test.status == TestStatus.COMPLETED || test.status == TestStatus.EXPIRED) {
        return ResponseModel.getInvalidResponse(["Test is either completed or expired"]);
      }

      //If test status is created, assigns random questions to the test with the type of question
      if (test.status == TestStatus.CREATED) {
        let typeQuestions = await DbModels.QuestionModel.find({ type: test.type });
        console.log("TYPE IS", test.type);
        console.log(typeQuestions)
        let random = ModelHelper.random(0, typeQuestions.length - ModelHelper.calcNumQuestions(test.type));
        console.log("TYPE LENGTH-numQUESTIONS", typeQuestions.length - ModelHelper.calcNumQuestions(test.type))
        //Implement type later
        test.questions = await DbModels.QuestionModel.find({ type: test.type }).skip(random).limit(ModelHelper.calcNumQuestions);
        console.log(test.questions);
      }

      //Declares all the rest of the test properties
      test.answers = [];
      test.status = TestStatus.STARTED;
      test.StartTime = Date.now();
      test.updatedAt = Date.now();
      await test.save();


      let currentQuestionId = test.questions[test.currentIndex];
      console.log(currentQuestionId);

      //Finds the current questionId and assigns it to the test
      let nextQuestion = await DbModels.QuestionModel.findById(currentQuestionId);
      console.log(nextQuestion);

      test.question = nextQuestion;
      let size: number = nextQuestion.answer;
      nextQuestion.answer = null;

      let response = { "question": nextQuestion, "_id": test._id, "status": test.status, "finalScore": test.finalScore, "currentIndex": test.currentIndex, "size": size };

      return ResponseModel.getValidResponse(response);
      //return ResponseModel.getValidResponse(test);
    }
    catch (err) {
      return MongoErrorHandler.handleError(err);
    }

  }

  //Inputs include: Test Id, mobileNo, answer
  //Outputs include: Test 
  public static async submitAnswer(req: Request): Promise<ResponseModel> {
    try {
      console.log("This is the request: ", req.body);
      let test = await DbModels.TestModel.findById(req.body._id).populate({ path: 'user', select: 'name email' });
      console.log("This is the test", test);

      //Checks to see if mobileNo or testId is incorrect
      if (!test || test.user.email != req.body.email) {
        return ResponseModel.getInvalidResponse(['Either email or test code is incorrect']);
      }

      //Checks to see if test has been started
      if (test.status != TestStatus.STARTED) {
        return ResponseModel.getInvalidResponse(["Bad Request! Test has not been started"]);
      }

      //Checks to see if current question has been answered already
      // let currentQuestionId=test.questions[test.currentIndex]
      // if (currentQuestionId != test) {
      //   return ResponseModel.getInvalidResponse(['Bad Request! Question already answered.']);
      // }

      //Checks to see if time is up. If it is, ends the test
      if (test.status == TestStatus.STARTED && ModelHelper.isTimeOver(test.startTime)) {
        test.status = TestStatus.COMPLETED;
        test.updatedAt = Date.now();
        await test.save();
        console.log("Test had expired", test);

        return ResponseModel.getValidResponse(test);
      }

      //Assigns the current question
      let question = await DbModels.QuestionModel.findById(test.questions[test.currentIndex]);
      //console.log("The current question is: ", question);

      //Adds score to 1 if question answer is correct
      if (question.answer == req.body.answer) {
        test.finalScore += 1;
      }
      //Pushes the answer to the answer array and moves to next Question
      test.answers.push(req.body.answer);
      test.currentIndex += 1;
      await test.save();

      //Checks to see if all the questions have been answered or gone through
      if (test.currentIndex >= ModelHelper.NUMBER_OF_QUESTIONS) {
        test.status = TestStatus.COMPLETED;
        test.updatedAt = Date.now();
        await test.save();
        let response = { "question": null, "_id": test._id, "status": test.status, "finalScore": test.finalScore, "currentIndex": test.currentIndex, "size": 3 };


        //Better handle, send signal from backend that test has completed
        return ResponseModel.getValidResponse(response);
      }

      let currentQuestionId = test.questions[test.currentIndex];
      let nextQuestion = await DbModels.QuestionModel.findById(currentQuestionId);
      test.question = nextQuestion;
      let size: number = nextQuestion.answer;
      nextQuestion.answer = null;

      let response = { "question": nextQuestion, "_id": test._id, "status": test.status, "finalScore": test.finalScore, "currentIndex": test.currentIndex, "size": size };

      return ResponseModel.getValidResponse(response);
    }
    catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }
}