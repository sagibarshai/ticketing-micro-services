import { Request, Response } from "express";
import { createTicket } from "../models/ticket";

export const createTicketController = async (req: Request, res: Response) => {
  const { price, title } = req.body;
  const { id } = req.currentUser;
  const ticket = await createTicket({ userId: id, price, title });
  return res.json({ data: ticket });
};
