import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) { }

    async create(createOrderDto: any): Promise<Order> {
        const newOrder = new this.orderModel(createOrderDto);
        return newOrder.save();
    }

    async findByUser(userId: string): Promise<Order[]> {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
}
