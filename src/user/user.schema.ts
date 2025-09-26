import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = Users & Document;

@Schema({timestamps: true})
export class Users {
    @Prop({required: true}) // for mandatory fields
    name: string;
    
    @Prop({required: true, unique: true})
    email: string;

    // @Prop()  ------>for optional fields
    // age?: number;
}

export const UserSchema = SchemaFactory.createForClass(Users);