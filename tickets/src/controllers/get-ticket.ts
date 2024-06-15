import { NextFunction, Request, Response } from "express";
import { getTicket } from "../models/ticket";
import { badRequestError, databaseRequestError } from "@sagi-ticketing/common";

const getTicketController = async (req: Request, res: Response, next: NextFunction) => {
  const id: number | undefined = req.params.id ? Number(req.params.id) : undefined;

  try {
    const tickets = await getTicket(req.currentUser.id, id);
    if (id !== undefined && tickets.length === 0) return badRequestError([{ message: `Ticket with id ${id} does not exists` }], next);

    return res.status(200).json({ data: id !== undefined ? tickets[0] : tickets });
  } catch (err) {
    console.error(
      `Unable to get ${id ? `ticket with id ${id} for user with id ${req.currentUser.id}` : `tickets for user with id ${req.currentUser.id}`}`,
      err
    );
    return databaseRequestError([], next);
  }
};

export { getTicketController };
