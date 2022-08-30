import { Express } from "express";
import process from "process";

import healthcheck from "./routes/healthcheck";
import jwt from "./routes/jwt";
import login from "./routes/login";
import token from "./routes/tokenManager";
import users from "./routes/users";


function routes(app: Express) {
  app.use("/users", users);
  app.use("/healthcheck", healthcheck);
  app.use("/login", login);
  app.use("/auth", jwt);

  if (process.env?.NODE_ENV !== "production") { 
    app.use("/token", token);
  }
}

export default routes;
