import { NextFunction, Request, Response } from "express";
import { createTicket } from "../models/ticket";
import { databaseRequestError } from "@sagi-ticketing/common";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../events";

interface CreateTicketRequest extends Request {
  body: {
    price: number;
    title: string;
  };
}

export const createTicketController = async (req: CreateTicketRequest, res: Response, next: NextFunction) => {
  const { price, title } = req.body;
  const { id } = req.currentUser;

  try {
    const ticket = (await createTicket({ userId: id, price, title }))[0];
    const ticketPublisher = new TicketCreatedPublisher(natsWrapper.client!);
    // publish ticket event
    await ticketPublisher.publish({
      ...ticket,
    });
    return res.status(201).json({ data: ticket });
  } catch (err) {
    console.error(`Ticket with user id of ${id} cannot be inserted into tickets table `, err);
    return databaseRequestError([], next);
  }
};
