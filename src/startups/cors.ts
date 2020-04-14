export class Cors {
  public static enableCores(app) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, pragma, cache-control");
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
      res.header("Access-Control-Allow-Credentials", true);

      next();
    });

    app.options('/*', function (req, res) {
      res.send();
    });
  }
}