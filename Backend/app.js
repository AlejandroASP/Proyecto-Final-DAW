import express from "express";
import cors from "cors";
import winston from "winston";
import "./server/db.js";
import "./models/associations.js";
import cartRouter from './server/routes/cart.js';
import gameRouter from "./server/routes/game.js";
import genreRouter from "./server/routes/genre.js";
import userRouter from "./server/routes/user.js";

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: [`http://127.0.0.1:5173`, `http://localhost:5173`],
  optionsSuccessStatus: 200,
};

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({limit: '50mb'}));

import "./models/associations.js";

app.use('/api/cart', cartRouter);
app.use("/api/game", gameRouter);
app.use("/api/genre", genreRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
