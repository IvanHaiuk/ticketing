import { Publisher, Subjects, OrderCancelledEvent } from "@ih_tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
};