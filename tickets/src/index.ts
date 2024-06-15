import express, { Request, Response } from "express";
import { json } from "body-parser";
import { initDb } from "./models/db";
import { createTicketsRouter } from "./routes/create-ticket";
import { getTicketRouter } from "./routes/get-ticket";
import { currentUserMiddleWare, errorHandler, requireAuthMiddleWare } from "@sagi-ticketing/common";
import cookieSession from "cookie-session";
import { editTicketRouter } from "./routes/edit-ticket";

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

app.use("/api/tickets", getTicketRouter);

app.use("/api/tickets", createTicketsRouter);

app.use("/api/tickets", editTicketRouter);

const startUp = () => {
  // wait 5000 ms for postgres db be ready
  setTimeout(async () => {
    await initDb();
    console.log("Ticketing server up on 4001!");
  }, 5000);
};

app.use(errorHandler);

app.listen(4001, () => startUp());
