import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: Types.ObjectId;

    @Prop({
        type: [
            {
                productId: { type: Types.ObjectId, ref: 'Product', required: true },
                title: { type: String },
                price: { type: Number },
                imageUrl: { type: String },
                description: { type: String },
                category: { type: String },
                quantity: { type: Number, default: 1 },
            },
        ],
        default: [],
    })
    items: {
        productId: Types.ObjectId;
        title: string;
        price: number;
        imageUrl: string;
        description?: string;
        category?: string;
        quantity: number;
    }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
