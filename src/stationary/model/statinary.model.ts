import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType, Field, ID } from '@nestjs/graphql';
export type StationaryDocument = Stationary & Document;

@Schema()
@ObjectType()
export class Stationary extends Document {
    @Field(() => ID)
    declare readonly _id: string;

    @Prop({ required: true })
    @Field()
    title: string;

    @Prop({ required: true })
    @Field()
    author: string;

    @Prop()
    @Field({ nullable: true })
    description?: string;
}

export const StationarySchema = SchemaFactory.createForClass(Stationary);