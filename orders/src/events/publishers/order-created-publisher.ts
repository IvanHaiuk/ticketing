import { Publisher, Subjects, OrderCreatedEvent } from "@ih_tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
};