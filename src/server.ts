import * as bodyParser from "body-parser";
import * as express from "express";
import { Db } from './startups/db';
import { Routes } from './startups/routes';
import { Cors } from "./startups/cors";
import * as compression from "compression";

class Server {
  private static port: number = 8000;

  public app = express.Application;

  public constructor() {
    this.app = express();

    this.app.use(compression());

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());


    Cors.enableCores(this.app);

    this.runStartups();

    this.app.listen(Server.port, Server.bootUpListener);
  }

  public runStartups() {
    Db.connectMongo();
    Routes.registerRoutes(this.app);
  }

  public static bootUpListener() {
    console.log(`server is listening at port: ${Server.port}`)
  }
}

new Server();