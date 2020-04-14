import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, deafult: Date.now }
})
