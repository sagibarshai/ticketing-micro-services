import { NextFunction, Request, Response } from "express";
import { getOrderModel } from "../models/order";
import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id: number | undefined = Number(req.params.id);
  try {
    const order = await getOrderModel(req.currentUser.id, Number.isNaN(id) ? undefined : id);
    if (!order) return badRequestError([{ message: "order id is not valid" }], next);
    if (id && !order[0]) return badRequestError([{ message: `Order with id of ${id} is not exists` }], next);
    return res.status(201).json({ data: id ? order[0] : order });
  } catch (err) {
    console.log("Error with create order controller ", err);
    return databaseRequestError([], next);
  }
};




export { getOrder as getOrderController };
