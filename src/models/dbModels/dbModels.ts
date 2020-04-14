import * as mongoose from "mongoose";
import { questionSchema } from './schemas/questionSchema';
import { userSchema } from './schemas/userSchema';
import { testSchema } from './schemas/testSchema';

export class DbModels {
  public static QuestionModel = mongoose.model("questionCollection", questionSchema);
  public static UserModel = mongoose.model("userCollection3", userSchema);
  public static TestModel = mongoose.model("testCollection", testSchema);
}