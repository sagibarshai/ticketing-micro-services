import { Listener, Subjects, TicketCreatedEvent } from "@sagi-ticketing/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from ".";
import { createTicket } from "../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "ticket-created-queue-group";
  onMessage(data: { id: number; userId: number; title: string; price: number }, msg: Message): void {
    (async () => {
      const ticket = await createTicket(data);
      console.log("ticket created ! ", ticket);
      msg.ack();
    })();
  }
}
