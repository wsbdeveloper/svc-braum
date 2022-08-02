import dayjs from "dayjs";
import logger from "pino";


const transport = logger.transport({
  target: "pino-pretty",
  options: { colorize: true },
});
const log = logger(
  {
    options: { colorize: true },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

export default log;
