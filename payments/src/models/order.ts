import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@ih_tickets/common";

export { OrderStatus };

interface OrderAttrs {
    id: string;
    userId: string;
    status: OrderStatus;
    version: number;
    price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    version: number;
    price: number;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    price: {
        type: Number,
        require: false
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    }
});

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status,
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };