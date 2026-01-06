import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
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
}
