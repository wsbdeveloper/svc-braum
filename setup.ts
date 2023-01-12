import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import routes from "./src/infra/routes";

import logger from "./src/helpers/logger";

function createServer() { 
  const app = express();
  dotenv.config();
  
  app.use(function (req: Request, res: Response, next) {
    logger.info("Time:", Date.now());
    next();
  });

  app.use(express.json());
  app.setMaxListeners(1)
  app.use(cors())

  routes(app)

  return app
}


export default createServer;