import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./src/infra/routes";

function createServer() { 
  const app = express();
  dotenv.config();
  
  app.use(express.json());
  app.setMaxListeners(1)
  app.use(cors())

  routes(app)

  return app
}


export default createServer;