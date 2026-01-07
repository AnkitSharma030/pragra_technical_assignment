import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(
        private configService: ConfigService,
        @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    ) {
        this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY') || '', {
            apiVersion: '2024-12-18.acacia' as any,
        });
    }

    async createPaymentIntent(amount: number, currency: string = 'usd') {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
        });
    }

    async savePayment(data: { userId: string; stripePaymentId: string; amount: number; status?: string }) {
        const newPayment = new this.paymentModel(data);
        return newPayment.save();
    }

    async getPaymentsByUser(userId: string) {
        return this.paymentModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
}
