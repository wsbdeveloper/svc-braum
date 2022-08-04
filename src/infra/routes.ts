import { Express } from "express";

import healthcheck from "./routes/healthcheck";
import login from "./routes/login";
import users from "./routes/users";


function routes(app: Express) {
  app.use("/users", users);
  app.use("/healthcheck", healthcheck);
  app.use("/login", login);
}

export default routes;
