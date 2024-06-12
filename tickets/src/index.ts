import express, { Request, Response } from "express";
import { json } from "body-parser";
import { initDb } from "./models/db";

const app = express();
app.use(json());

app.get("/api/tickets", (req: Request, res: Response) => res.send("hi"));

const startUp = () => {
  // wait 5000ms for db be ready
  setTimeout(async () => {
    await initDb();
    console.log("Ticketing server up on 4001!");
  }, 5000);
};

app.listen(4001, () => startUp());
