import { pgClient } from "..";
import { User } from "./types";
import { toHash, compare } from "./utils";

export const getUser = async (email: string): Promise<User | null> => {
  try {
    const users = (await pgClient.query(`SELECT * FROM users WHERE email=$1`, [email])).rows as User[];
    if (users.length === 0) return null;
    return users[0];
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};

export const insertUser = async (user: Omit<User, "id">): Promise<User | null> => {
  try {
    const hashed = await toHash(user.password);
    const insertedUser = (await pgClient.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [user.email, hashed]))
      .rows[0] as User;
    return insertedUser;
  } catch (err) {
    console.error("Error inserting user:", err);
    throw err;
  }
};
