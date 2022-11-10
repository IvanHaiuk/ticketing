import express, { Request, Response }  from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@ih_tickets/common';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();


router.post("api/payments", 
    requireAuth,
    [
        body("token")
            .not()
            .isEmpty(),
        body("orderId")
            .not()
            .isEmpty()
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError("Order is cancelled");
        }

        await new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: "123",
            orderId: order.id
        });
        
        res.send({ success: true });
    }
);

export { router as createchargeRouter };