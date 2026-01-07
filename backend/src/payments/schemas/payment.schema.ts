import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    stripePaymentId: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ default: 'succeeded' })
    status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
