import { Question } from '../models/question';
import { ResponseModel } from '../models/DTOs/responseModel';
import { MongoErrorHandler } from '../helpers/mongoErrorHandler';
import { DbModels } from '../models/dbModels/dbModels';
import { ModelHelper } from "../helpers/modelHelper";

export class QuestionService {
  public static async create(data: Question): Promise<ResponseModel> {
    try {
      let newQuestion = await DbModels.QuestionModel(data);
      await newQuestion.save();

      return ResponseModel.getValidResponse(newQuestion);

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async getAll(): Promise<ResponseModel> {

    try {
      let questions = await DbModels.QuestionModel.find();
      return ResponseModel.getValidResponse(questions);

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async get(id: string): Promise<ResponseModel> {

    try {
      let question = await DbModels.QuestionModel.findById(id);
      return ResponseModel.getValidResponse(question);

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async getType(type: string): Promise<ResponseModel> {

    try {
      let questions = await DbModels.QuestionModel.find({ type: type });
      return ResponseModel.getValidResponse(questions);

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async update(data: Question): Promise<ResponseModel> {
    try {
      let question = await DbModels.QuestionModel.findById(data._id);
      question = ModelHelper.updateFields(question, data);
      await question.save();

      return ResponseModel.getValidResponse(question);

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }

  public static async remove(id: string): Promise<ResponseModel> {

    try {
      let question = await DbModels.QuestionModel.deleteOne({ _id: id });

      return ResponseModel.getValidResponse("deleted");

    } catch (err) {
      return MongoErrorHandler.handleError(err);
    }
  }


}