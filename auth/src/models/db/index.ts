import { Pool } from "pg";

export const pgClient = new Pool({
  port: 5432,
  user: "postgres",
  database: "postgres",
  password: "postgres",
  host: "auth-pg-service",
  ssl: false,
});

export const initDB = async () => {
  try {
    await pgClient.connect();

    await pgClient.query("CREATE DATABASE usersDB");
    console.log("Database usersDB created!");

    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      )
      `);
    console.log("Table users created!");
    return;
  } catch (err) {
    console.log("Error connect to postgres auth service ", err);
  }
};
