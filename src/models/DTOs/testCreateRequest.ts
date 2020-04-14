import { BaseModel } from "../baseModel";

export class TestCreateRequest extends BaseModel {
  public name: string;
  public password: string;
  public email: string;
  public type: string;
}