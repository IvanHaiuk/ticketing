import { Publisher, Subjects, ExpirationCompleteEvent } from "@ih_tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
};