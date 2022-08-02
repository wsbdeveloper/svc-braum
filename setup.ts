import dotenv from "dotenv";
import express from "express";
import routes from "./src/infra/routes";

function createServer() { 
  const app = express();
  dotenv.config();
  
  app.use(express.json());
  app.setMaxListeners(1)

  routes(app)

  return app
}


export default createServer;