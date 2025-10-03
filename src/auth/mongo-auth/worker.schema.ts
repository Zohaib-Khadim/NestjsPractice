import { SchemaFactory ,  Schema , Prop} from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
    @Prop({ required: true , unique: true})
    email: string;

    @Prop({ required: true })
    password: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
