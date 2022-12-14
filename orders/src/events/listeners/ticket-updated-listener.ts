import { Listener, Subjects, TicketUpdatedEvent } from "@ih_tickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        ticket.set({ 
            title: data.title, 
            price: data.price
        });

        await ticket.save();
        msg.ack();
    }
    
}


