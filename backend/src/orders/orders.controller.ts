import { Body, Controller, Get, Param, Post, Request, UseGuards, Logger, InternalServerErrorException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        this.logger.log(`Received order request: ${JSON.stringify(createOrderDto)}`);
        try {
            return await this.ordersService.create(createOrderDto);
        } catch (error) {
            this.logger.error(`Error in OrdersController: ${error.message}`, error.stack);
            throw new InternalServerErrorException(error.message);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('my-orders/:userId') // Temporary param for testing without auth guard
    findMyOrders(@Param('userId') userId: string) {
        return this.ordersService.findByUser(userId);
    }
}
