import { NextFunction, Request, Response } from "express";
import { editTicket } from "../models/ticket";
import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";

interface EditTicketRequest extends Request {
  body: {
    id: number;
    price: number;
    title: string;
  };
}

const editTicketController = async (req: EditTicketRequest, res: Response, next: NextFunction) => {
  const userId = req.currentUser.id;
  const { id, price, title } = req.body;
  try {
    const ticket = (await editTicket(id, price, title, userId))[0];
    if (!ticket) return badRequestError([{ message: `Ticket with id ${id} is not exists` }], next);
    return res.status(201).json({ data: ticket });
  } catch (err) {
    console.error(`Unable to edit ticket with id ${id}`, err);
    return databaseRequestError([], next);
  }
};

export { editTicketController };
