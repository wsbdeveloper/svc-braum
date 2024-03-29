import { Express } from "express";
import process from "process";

import healthcheck from "./routes/healthcheck";
import jwt from "./routes/jwt";
import login from "./routes/login";
import { default as token, default as tokenManager } from "./routes/tokenManager";
import users from "./routes/users";

function routes(app: Express) {
  app.use("/users", users);
  app.use("/healthcheck", healthcheck);
  app.use("/login", login);
  app.use("/auth", jwt);
  app.use("/checktoken", tokenManager);

  if (process.env?.NODE_ENV !== "production") { 
    app.use("/token", token);
  }
}

export default routes;
