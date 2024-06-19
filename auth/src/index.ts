import cookieSession from "cookie-session";
import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { Subjects, errorHandler } from "@sagi-ticketing/common";
import { initDB } from "./models/db";
import { notFoundError, TicketCreatedEvent, Listener } from "@sagi-ticketing/common";
import { Message } from "node-nats-streaming";
import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

const app = express();
app.set("trust proxy", true); // express will trust proxy as https

app.use(json());
app.use(
  cookieSession({
    signed: false, // not encrypt the cookie
    secure: true, // https only
  })
);

class TicketCreatedLister extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "auth-queue group";
  onMessage(data: { id: number; userId: number; title: string; price: number }, msg: Message): void {
    msg.ack();
    console.log("data ", data);
  }
}

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), { url: "http://nats-service:4222" });

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const listener = new TicketCreatedLister(stan);
  listener.listen();
});

app.use("/api/auth/", currentUserRouter);

app.use("/api/auth/", signInRouter);

app.use("/api/auth/", signOutRouter);

app.use("/api/auth", signUpRouter);

app.use("*", (_, __, next) => {
  return notFoundError([], next);
});

app.use(errorHandler);

const startUp = () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  //  wait 5000 ms for the postgres pod will be up and running
  setTimeout(async () => {
    await initDB();

    console.log(`Auth service up on port 4000`);
  }, 10000);
};

app.listen(4000, () => startUp());
