import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {}

    @Post()
    createProduct() {
        return this.productsService.createProduct();
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }
}
