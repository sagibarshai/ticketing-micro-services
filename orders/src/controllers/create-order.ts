import { databaseRequestError } from "@sagi-ticketing/common";
import { NextFunction, Request, Response } from "express";
import { Order, createOrderModel } from "../models/order";

interface CreateOrderRequest extends Request {
  body: Omit<Order, "id">;
}

const createOrder = async (req: CreateOrderRequest, res: Response, next: NextFunction) => {
  const { expiredAt, status, ticketId, userId } = req.body;
  try {
    const order = await createOrderModel({ expiredAt, status, ticketId, userId });
    return res.status(201).json({ data: order });
  } catch (err) {
    console.log("Error with create order controller ", err);
    return databaseRequestError([], next);
  }
};

export { createOrder as createOrderController };
