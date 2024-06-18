import { Publisher, Subjects, TicketCreatedEvent } from "@sagi-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  async publish(data: TicketCreatedEvent["data"]) {
    console.log("publish an event ! ", data);
  }
}
