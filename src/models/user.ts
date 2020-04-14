import { BaseModel } from './baseModel';

export class User extends BaseModel {
  public name: string;
  public email: string;
  public mobile: string;
  public password: string;
}