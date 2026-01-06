import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assume this exists or will be created

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    // @UseGuards(JwtAuthGuard) // Enable authentication later
    @Post()
    create(@Body() createOrderDto: any, @Request() req) {
        // createOrderDto.userId = req.user.userId; // valid when auth is on
        return this.ordersService.create(createOrderDto);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('my-orders/:userId') // Temporary param for testing without auth guard
    findMyOrders(@Param('userId') userId: string) {
        return this.ordersService.findByUser(userId);
    }
}
