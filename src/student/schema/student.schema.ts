import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';    
import { Address } from './address.schema';

@Schema()
export class Student extends Document {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({type:Address})
    address: Address;
}

export const StudentSchema = SchemaFactory.createForClass(Student);