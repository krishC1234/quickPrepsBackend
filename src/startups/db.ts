import * as mongoose from "mongoose";

export class Db {
  private static mongoURL: string = "mongodb+srv://root:password0@cluster0-vbflf.mongodb.net/test?retryWrites=true&w=majority";

  public static connectMongo() {
    mongoose.connect(Db.mongoURL).then(() => {
      console.log("Connection succesful");
    })
      .catch(error => {
        console.log(error);
        console.log("Connection failed");
      })
  }
}