import express from "express";
import { json } from "body-parser";
import { initDb } from "./models/db";
import { createTicketsRouter } from "./routes/create-ticket";
import { getTicketRouter } from "./routes/get-ticket";
import { currentUserMiddleWare, errorHandler, requireAuthMiddleWare } from "@sagi-ticketing/common";
import cookieSession from "cookie-session";
import { editTicketRouter } from "./routes/edit-ticket";
import { natsWrapper } from "./events";
import { randomBytes } from "crypto";

const app = express();
app.use(json());
app.set("trust proxy", true); // express will trust proxy as https
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined!");

app.use(currentUserMiddleWare, requireAuthMiddleWare);

app.use("/api/tickets/", getTicketRouter, createTicketsRouter, editTicketRouter);

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
    console.log("Ticketing server up on 4001!");
  }, 10000);
};

app.use(errorHandler);

app.listen(4001, () => startUp());
