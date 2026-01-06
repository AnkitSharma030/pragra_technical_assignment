import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) { }

    async getCart(userId: string): Promise<Cart> {
        let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) });
        if (!cart) {
            cart = await this.cartModel.create({ userId: new Types.ObjectId(userId), items: [] });
        }
        return cart;
    }

    async addToCart(
        userId: string,
        product: { productId: string; name: string; price: number; image: string; description?: string; category?: string },
    ): Promise<Cart> {
        const cart = await this.getCart(userId);
        const existingItem = cart.items.find((item) => item.productId.toString() === product.productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                productId: new Types.ObjectId(product.productId),
                title: product.name,
                price: product.price,
                imageUrl: product.image,
                description: product.description,
                category: product.category,
                quantity: 1,
            });
        }

        return cart.save();
    }

    async removeFromCart(userId: string, productId: string): Promise<Cart> {
        const cart = await this.getCart(userId);
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        return cart.save();
    }

    async updateQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
        const cart = await this.getCart(userId);
        const item = cart.items.find((item) => item.productId.toString() === productId);

        if (item) {
            if (quantity <= 0) {
                cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
            } else {
                item.quantity = quantity;
            }
        }

        return cart.save();
    }

    async clearCart(userId: string): Promise<Cart> {
        const cart = await this.getCart(userId);
        cart.items = [];
        return cart.save();
    }
}
