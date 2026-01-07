import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('create-intent')
    async createPaymentIntent(@Body() body: { amount: number }) {
        return this.paymentsService.createPaymentIntent(body.amount);
    }

    @Post('save')
    async savePayment(@Body() body: { userId: string; stripePaymentId: string; amount: number; status?: string }) {
        return this.paymentsService.savePayment(body);
    }

    @Get('history/:userId')
    async getPaymentHistory(@Param('userId') userId: string) {
        return this.paymentsService.getPaymentsByUser(userId);
    }
}
