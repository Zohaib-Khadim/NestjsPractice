import { Injectable } from '@nestjs/common';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async createProduct(): Promise<Product> {
    const newProduct = new this.productModel({
      name: 'Sample Product',
      price: 99.99,
      description: 'This is a sample product',
      tags: [
        { name: 'Sample Tag', description: 'This is a sample tag' },
        { name: 'Another Tag', description: 'This is another tag' },
        { name: 'Third Tag', description: 'This is third tag' },
      ],
    });
    return newProduct.save();
  }
    async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
