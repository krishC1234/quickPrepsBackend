import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const questionSchema = new Schema({
  type: { type: String, enum: ["Math SAT 2", "Physics SAT", "AP Biology", "AP Stats", "AP Physics 1", "AP US History", "AP Gov", "AP Macro", "Biology SAT", "US History SAT", "SQL", "Javascript", "HTML/CSS"], default: "Math SAT 2", required: true },
  image: { type: String },
  question: { type: String, required: true },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, required: true },
  optionD: { type: String, required: true },
  answer: { type: Number, enum: [1, 2, 3, 4], required: true }
})