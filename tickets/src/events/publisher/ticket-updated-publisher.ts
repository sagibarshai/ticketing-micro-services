import { Publisher, Subjects, TicketUpdatedEvent } from "@sagi-ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
