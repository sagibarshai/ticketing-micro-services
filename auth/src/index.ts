import express, { Request, Response } from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errors";
import { notFoundError } from "./errors/not-found";
import { initDB } from "./models/db";

const app = express();

app.use(json());

app.use("/api/auth/", currentUserRouter);

app.use("/api/auth/", signInRouter);

app.use("/api/auth/", signOutRouter);

app.use("/api/auth", signUpRouter);

app.use("*", (req, res, next) => {
  return notFoundError([], next);
});

app.use(errorHandler);

const startUp = () => {
  //  wait 5000 ms for the postgres pod will be up and running
  setTimeout(async () => {
    await initDB();
    console.log(`Auth service up on port 3000`);
  }, 5000);
};

app.listen(3000, () => startUp());
