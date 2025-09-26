import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Tag } from "./tag.schema";
@Schema()
export class Product extends Document {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop({type:[Tag]})
    tags: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);