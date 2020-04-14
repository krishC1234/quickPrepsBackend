export class BaseModel {
  public _id: string;

  public constructor(data: any) {
    this.transform(data);
  }

  public transform(data: any): void {
    for (var prop in data) {
      if (prop == "__v") {
        continue;
      }
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }
  }
}