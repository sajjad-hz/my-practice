import express from "express";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import path from "path";
import methodOverride from "./middlewares/method-override";
import { sequelize } from "./config/databse";
import auth from "./middlewares/auth";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import { createClient } from "redis";

export async function bootstrap() {
  const app = express();

  app.set("views", path.resolve(__dirname, "views"));
  app.set("view engine", "ejs");

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(methodOverride);

  await sequelize.authenticate();
  await sequelize.sync({force:true});

  // const redisClient = new Redis(6383);
  // const store = new RedisStore({ client: redisClient});
  let redisClient = createClient();
  redisClient.connect().catch(console.error);
  let store = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(auth);
  app.use(routes);

  app.use(errorHandler);

  const port = 3000;

  app.listen(port, () => {
    console.clear();
    console.log(`Server is running on port ${port}`);
  });
}
