import { NextFunction, Request, Response } from "express";
import { Order, updateOrderModel } from "../models/order";
import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";
interface CreateOrderRequest extends Request {
  body: Order;
}
const updateOrder = async (req: CreateOrderRequest, res: Response, next: NextFunction) => {
  const { expiredAt, id, status, ticketId, userId } = req.body;
  try {
    const order = await updateOrderModel({ expiredAt, id, status, ticketId, userId });
    if (!order) return badRequestError([{ message: "order id is not valid" }], next);
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log("Error with create order controller ", err);
    return databaseRequestError([], next);
  }
};

export { updateOrder as updateOrderController };
