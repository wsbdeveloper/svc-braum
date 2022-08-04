
import process from "process";
import createServer from "./setup";
import logger from "./src/helpers/logger";

const app = createServer();
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    logger.info(`Braum is battling in port:${port}`);
    //await connect();
  });
}

export default createServer