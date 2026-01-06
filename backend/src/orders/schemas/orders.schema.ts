import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    userId: string; // Linking by string ID for simplicity, or use ObjectId if User model is strictly referenced

    @Prop({
        type: [
            {
                productId: { type: String, required: true },
                title: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                imageUrl: { type: String },
                description: { type: String },
            },
        ],
        required: true,
    })
    items: {
        productId: string;
        title: string;
        quantity: number;
        price: number;
        imageUrl?: string;
        description?: string;
    }[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' })
    status: string;

    @Prop()
    stripePaymentId: string;

    @Prop({
        type: {
            fullName: String,
            phone: String,
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        default: null,
    })
    shippingAddress: {
        fullName?: string;
        phone?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
    };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
