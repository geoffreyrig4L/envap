import express from "express";
import cors from "cors";
import "dotenv/config";
import pino from "pino";
import route from "./src/routes.js";

const app = express();
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());

route({ app });

app.listen(3001, () => {
  logger.info(`Listening on 3001`);
});
