import { Publisher, Subjects, TicketCreatedEvent } from "@ih_tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
};