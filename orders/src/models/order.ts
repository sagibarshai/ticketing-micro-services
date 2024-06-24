import { pgClient } from "./db";

export interface Order {
  id: number;
  userId: number;
  status: "created" | "cancelled" | "pending" | "complete";
  expiredAt: Date;
  ticketId: number;
}

export const createOrderModel = async (order: Omit<Order, "id">): Promise<Order> => {
  const newOrder = (
    await pgClient.query(`INSERT INTO orders ("userId", status, "expiredAt", "ticketId") VALUES ($1, $2, $3, $4) RETURNING *`, [
      order.userId,
      order.status,
      order.expiredAt,
      order.ticketId,
    ])
  ).rows[0] as Order;
  return newOrder;
};

export const updateOrderModel = async (order: Order): Promise<Order> => {
  const updatedOrder = (await pgClient.query(`UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`, [order.status, order.id])).rows[0] as Order;
  return updatedOrder;
};

export const getOrderModel = async (userId: Order["userId"], id?: Order["id"]): Promise<Order[]> => {
  let order: Order[];

  if (id !== undefined)
    order = (
      await pgClient.query(
        `SELECT
         o.id AS "orderId",
         o."userId" AS "orderUserId",
         o."expiredAt" AS "orderExpiredAt",
         o.status AS "orderStatus",
         t.id AS "ticketId",
         t.title AS "ticketTitle",
         t.price AS "ticketPrice",
         t."userId" AS "ticketUserId" 
         FROM orders AS o
         LEFT JOIN tickets AS t ON o."ticketId"=t.id
         WHERE o.id=$1 AND o."userId"=$2
        `,
        [id, userId]
      )
    ).rows as Order[];
  else
    order = (
      await pgClient.query(
        `SELECT
         o.id AS "orderId",
         o."userId" AS "orderUserId",
         o."expiredAt" AS "orderExpiredAt",
         o.status AS "orderStatus",
         t.id AS "ticketId",
         t.title AS "ticketTitle",
         t.price AS "ticketPrice",
         t."userId" AS "ticketUserId" 
         FROM orders AS o
         LEFT JOIN tickets AS t ON o."ticketId"=t.id
         WHERE o."userId"=$1
   `,
        [userId]
      )
    ).rows as Order[];

  return order;
};
