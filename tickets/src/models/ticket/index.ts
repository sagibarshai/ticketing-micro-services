import { pgClient } from "../db";
import { Ticket } from "./types";

export const createTicket = async (ticket: Ticket): Promise<Ticket[]> => {
  return (
    await pgClient.query(`INSERT INTO tickets (userId, title, price) VALUES($1, $2, $3) RETURNING *`, [ticket.userId, ticket.title, ticket.price])
  ).rows;
};

export const getTicket = async (userId: number, id?: number): Promise<Ticket[]> => {
  let query = ``;
  let values = [];
  if (id === undefined) {
    query = `SELECT * FROM tickets WHERE userId=$1`;
    values = [userId];
  } else {
    query = `SELECT * FROM tickets WHERE userId=$1 AND id=$2`;
    values = [userId, id];
  }

  return (await pgClient.query(query, values)).rows as Ticket[];
};

export const editTicket = async (id: number, price: number, title: string, userId: number): Promise<Ticket[]> => {
  return (await pgClient.query(`UPDATE tickets SET price=$1, title=$2 WHERE id=$3 AND userId=$4 RETURNING *`, [price, title, id, userId]))
    .rows as Ticket[];
};
