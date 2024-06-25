import { NextFunction, Request, Response } from "express";
import { Order, updateOrderModel } from "../models/order";
import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";
interface UpdateOrderRequest extends Request {
  body: Omit<Order, "ticketId" | "userId" | "expiredAt">;
}
const updateOrder = async (req: UpdateOrderRequest, res: Response, next: NextFunction) => {
  const { id, status } = req.body;
  const userId = req.currentUser.id;
  try {
    const order = await updateOrderModel({ id, status, userId });
    if (!order) return badRequestError([{ message: "order id is not valid" }], next);
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log("Error with create order controller ", err);
    return databaseRequestError([], next);
  }
};

export { updateOrder as updateOrderController };
