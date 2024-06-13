import express, { Request, Response } from "express";
import { json } from "body-parser";
import { initDb } from "./models/db";
import { createTicketsRouter } from "./routes/create-ticket";
import { errorHandler } from "@sagi-ticketing/common";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true); // express will trust proxy as https
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

app.get("/api/tickets", (req: Request, res: Response) => res.send("hi"));

app.use("/api/tickets", createTicketsRouter);

const startUp = () => {
  // wait 5000 ms for postgres db be ready
  setTimeout(async () => {
    await initDb();
    console.log("Ticketing server up on 4001!");
  }, 5000);
};

app.use(errorHandler);

app.listen(4001, () => startUp());
