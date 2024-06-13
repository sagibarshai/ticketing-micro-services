import { pgClient } from "../db";
import { Ticket } from "./types";

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  console.log("ticket ", ticket);
  try {
    const createdTicket = (
      await pgClient.query(`INSERT INTO tickets (userId, title, price) VALUES($1, $2, $3) RETURNING *`, [ticket.userId, ticket.title, ticket.price])
    ).rows[0] as Ticket;
    return createdTicket;
  } catch (err) {
    console.error(`Ticket ${ticket} cannot be inserted into tickets table `, err);
    throw err;
  }
};

export const getTicket = async () => {};
