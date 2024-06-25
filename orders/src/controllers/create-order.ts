import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";
import { NextFunction, Request, Response } from "express";
import { Order, Status, createOrderModel } from "../models/order";
import { pgClient } from "../models/db";

interface CreateOrderRequest extends Request {
  body: Omit<Order, "id" | "expiredAt" | "status" | "userId">;
}

const createOrder = async (req: CreateOrderRequest, res: Response, next: NextFunction) => {
  const { ticketId } = req.body;
  const userId = req.currentUser.id;
  try {
    const ticket = (await pgClient.query(`SELECT * FROM orders WHERE "ticketId"=$1`, [ticketId])).rows[0] as Order;

    if (ticket && ticket.status !== Status.cancelled) {
      // cannot purchase the ticket.
      return badRequestError([{ message: "This ticket is in the middle of a purchase process right now.  " }], next);
    }
    const order = await createOrderModel({ expiredAt: new Date(), status: Status.pending, ticketId, userId });
    return res.status(201).json({ data: order });
  } catch (err) {
    console.log("Error with create order controller ", err);
    return databaseRequestError([], next);
  }
};

export { createOrder as createOrderController };
