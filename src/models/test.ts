import { BaseModel } from "./baseModel";
import { User } from './user';
import { Question } from './question';

export class Test extends BaseModel {
  public answers: number[];
  public currentIndex: number;
  public finalScore: number;
  public status: string;
  public questions: Question;
  public user: User;
  public startTime: Date;
  public updatedAt: Date;
}