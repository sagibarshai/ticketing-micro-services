import { NextFunction, Request, Response } from "express";
import { createTicket } from "../models/ticket";
import { databaseRequestError } from "@sagi-ticketing/common";

export const createTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const { price, title } = req.body;
  const { id } = req.currentUser;
  try {
    const ticket = (await createTicket({ userId: id, price, title }))[0];
    return res.json({ data: ticket });
  } catch (err) {
    console.error(`Ticket with user id of ${id} cannot be inserted into tickets table `, err);
    return databaseRequestError([], next);
  }
};
