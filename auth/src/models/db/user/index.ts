import { pgClient } from "..";
import { User } from "./types";

export const getUser = async <T>(email: string): Promise<T[] | null> => {
  try {
    const { rows, rowCount } = await pgClient.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (rowCount === 0) return null;
    return rows as T[];
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};

export const insertUser = async <T>(user: User): Promise<T[]> => {
  try {
    const { rows } = await pgClient.query(`INSERT INTO users VALUES ($1, $2)`, [user.email, user.password]);

    return rows as T[];
  } catch (err) {
    throw err;
  }
};
