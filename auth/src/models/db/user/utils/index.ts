import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export const compare = async (suppliedPassword: string, storedPassword: string): Promise<boolean> => {
  try {
    const [_, salt] = storedPassword.split(".");
    const buffer = (await asyncScrypt(suppliedPassword, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}` === storedPassword;
  } catch (err) {
    console.log("Problem with compare password");
    return false;
  }
};

export const toHash = async (password: string) => {
  const salt = randomBytes(8).toString("hex");

  try {
    const buffer = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  } catch (err) {
    console.log("Problem with password hashing");
  }
};
