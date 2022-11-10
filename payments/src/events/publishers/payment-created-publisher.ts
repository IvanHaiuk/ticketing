import { Publisher, Subjects, PaymentCreatedEvent } from "@ih_tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
};