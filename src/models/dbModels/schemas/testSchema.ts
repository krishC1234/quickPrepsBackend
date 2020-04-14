import * as mongoose from "mongoose";
import { ModelHelper } from "../../../helpers/modelHelper";
import { TestStatus } from "../../../helpers/TestStatus";

const Schema = mongoose.Schema;

export const testSchema = new Schema({
  answers: [{ type: Number, default: -1 }],
  currentIndex: { type: Number, default: 0 },
  startTime: { type: Date },
  updatedAt: { type: Date },
  finalScore: { type: Number, default: 0 },

  type: { type: String, required: true },


  createdAt: { type: Date, default: Date.now },

  status: { type: String, enum: ModelHelper.testStatus, default: TestStatus.CREATED },

  questions: [{ type: Schema.Types.ObjectId, ref: "questionCollection" }],
  user: { type: Schema.Types.ObjectId, ref: "userCollection3", required: true }
})