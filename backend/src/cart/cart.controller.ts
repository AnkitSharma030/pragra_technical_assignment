import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    async getCart(@Req() req) {
        return this.cartService.getCart(req.user.userId);
    }

    @Post('add')
    async addToCart(
        @Req() req,
        @Body() product: { productId: string; name: string; price: number; image: string; description?: string; category?: string },
    ) {
        return this.cartService.addToCart(req.user.userId, product);
    }

    @Delete('remove/:productId')
    async removeFromCart(@Req() req, @Param('productId') productId: string) {
        return this.cartService.removeFromCart(req.user.userId, productId);
    }

    @Put('update')
    async updateQuantity(
        @Req() req,
        @Body() body: { productId: string; quantity: number },
    ) {
        return this.cartService.updateQuantity(req.user.userId, body.productId, body.quantity);
    }

    @Delete('clear')
    async clearCart(@Req() req) {
        return this.cartService.clearCart(req.user.userId);
    }
}
