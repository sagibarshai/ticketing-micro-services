import { pgClient } from "./db";

export interface Ticket {
  id: number;
  userId: number;
  title: string;
  price: number;
}

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  return (
    await pgClient.query(`INSERT INTO tickets (id, "userId", title, price) VALUES($1, $2, $3, $4) RETURNING *`, [
      ticket.id,
      ticket.userId,
      ticket.title,
      ticket.price,
    ])
  ).rows[0];
};

export const editTicket = async (id: number, price: number, title: string, userId: number): Promise<Ticket> => {
  return (await pgClient.query(`UPDATE tickets SET price=$1, title=$2 WHERE id=$3 AND "userId"=$4 RETURNING *`, [price, title, id, userId])).rows[0];
};
