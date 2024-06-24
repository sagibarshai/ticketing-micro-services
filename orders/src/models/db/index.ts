import { Client } from "pg";

export const pgClient = new Client({
  port: 5432,
  user: "postgres",
  database: "postgres",
  password: "postgres",
  host: "orders-pg-service",
  ssl: false,
});

export const initDb = async () => {
  try {
    await pgClient.connect();
    await pgClient.query("CREATE DATABASE orders");
    console.log("DATABASE orders just created!");
    await pgClient.query(`CREATE TABLE IF NOT EXISTS tickets (
            id SERIAL PRIMARY KEY,
            "userId" INT,
            price INT,
            title VARCHAR(255)
        )`);
    console.log("TABLE tickets just created!");

    await pgClient.query(`CREATE TYPE STATUS AS ENUM('created', 'cancelled', 'pending', 'complete')`);

    console.log("STATUS type created!");

    await pgClient.query(`
        CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        "userId" INT,
        status STATUS,
        "expiredAt" TIMESTAMP,
        "ticketId" INT REFERENCES tickets

      )`);
    console.log("TABLE orders just created!");
  } catch (err) {
    console.log("Error with init db ", err);
  }
};
