import express, { Request, Response } from "express";
import { json } from "body-parser";
import { randomBytes } from "crypto";

import cookieSession from "cookie-session";
import { currentUserMiddleWare, errorHandler, requireAuthMiddleWare } from "@sagi-ticketing/common";
import { natsWrapper } from "./events";
import { initDb } from "./models/db";
import { getOrderRouter } from "./routes/get-order";
import { updateOrderRouter } from "./routes/update-order";
import { createOrderRouter } from "./routes/create-order";

if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined!");

const app = express();
app.use(json());
app.set("trust proxy", true); // express will trust proxy as https
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

app.use(currentUserMiddleWare, requireAuthMiddleWare);

app.use("/api/orders", getOrderRouter, updateOrderRouter, createOrderRouter);

// app.use(currentUserMiddleWare, requireAuthMiddleWare);

const startUp = () => {
  // wait 10000 ms for postgres db and NATS to be ready

  setTimeout(async () => {
    await initDb();
    await natsWrapper.connect("ticketing", randomBytes(4).toString("hex"), "http://nats-service:4222");
    natsWrapper.client?.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client?.close());
    process.on("SIGTERM", () => natsWrapper.client?.close());
    console.log("Orders server up on 4002!");
  }, 10000);
};

app.use(errorHandler);

app.listen(4002, () => startUp());
