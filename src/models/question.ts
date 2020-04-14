import { BaseModel } from "./baseModel";

export class Question extends BaseModel {
  public type: string;
  public image: string;
  public question: string;
  public optionA: string;
  public optionB: string;
  public optionC: string;
  public optionD: string;
  public answer: number;
}