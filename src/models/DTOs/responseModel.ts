export class ResponseModel {
  public isValid: boolean;
  public data: any;
  public errors: string[];

  public constructor(isValid: boolean, data: any, errors: string[]) {
    this.isValid = isValid;
    this.data = data;
    this.errors = errors;
  }

  public static getValidResponse(data: any): ResponseModel {
    return new ResponseModel(true, data, null);
  }

  public static getInvalidResponse(errors: string[]): ResponseModel {
    return new ResponseModel(false, null, errors);
  }
}