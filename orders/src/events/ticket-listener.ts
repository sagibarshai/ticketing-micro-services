import { Listener, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@sagi-ticketing/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from ".";
import { Ticket, createTicket, editTicket } from "../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "ticket-created-queue-group";
  onMessage(data: Ticket, msg: Message): void {
    (async () => {
      await createTicket(data);
      msg.ack();
    })();
  }
}

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = "ticket-updated-queue-group";
  onMessage(data: Ticket, msg: Message): void {
    (async () => {
      await editTicket(data);
      msg.ack();
    })();
  }
}
