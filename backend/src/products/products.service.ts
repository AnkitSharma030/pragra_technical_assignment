import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async create(createProductDto: any): Promise<Product> {
        const newProduct = new this.productModel(createProductDto);
        return newProduct.save();
    }

    async seedProducts(): Promise<Product[]> {
        const count = await this.productModel.countDocuments();
        if (count > 0) {
            return this.productModel.find().exec(); // Already seeded
        }

        const dummyProducts = [
            {
                title: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30h battery life.',
                price: 199.99,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
                category: 'Electronics',
                stock: 50,
            },
            {
                title: 'Smart Watch Series 7',
                description: 'Advanced health monitoring, fitness tracking, and cellular connection.',
                price: 399.00,
                imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format',
                category: 'Electronics',
                stock: 30,
            },
            {
                title: 'Ergonomic Office Chair',
                description: 'High-back mesh chair with lumbar support and adjustable armrests.',
                price: 249.50,
                imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format',
                category: 'Furniture',
                stock: 15,
            },
            {
                title: 'Running Shoes',
                description: 'Lightweight running shoes with breathable mesh and cushioned sole.',
                price: 89.95,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
                category: 'Footwear',
                stock: 100,
            },
            {
                title: 'Mechanical Keyboard',
                description: 'RGB backlit mechanical keyboard with blue switches.',
                price: 120.00,
                imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500&auto=format',
                category: 'Electronics',
                stock: 25,
            },
            {
                title: 'Leather Wallet',
                description: 'Genuine leather wallet with RFID protection.',
                price: 45.00,
                imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format',
                category: 'Accessories',
                stock: 200,
            }
        ];

        return this.productModel.insertMany(dummyProducts);
    }
}
