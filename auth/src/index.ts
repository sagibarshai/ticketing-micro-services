import cookieSession from "cookie-session";
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
app.set("trust proxy", true); // express will trust proxy as https

app.use(json());
app.use(
  cookieSession({
    signed: false, // not encrypt the cookie
    secure: true, // https only
  })
);

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
  }, 5000);
};

app.listen(4000, () => startUp());
