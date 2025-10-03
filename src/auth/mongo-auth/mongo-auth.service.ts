import { Injectable } from '@nestjs/common';
import { Worker, WorkerDocument } from './worker.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class MongoAuthService {
    constructor(
        @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>, private jwtService: JwtService
    ) {}

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newWorker = new this.workerModel({ email, password: hashedPassword });
        return newWorker.save();
    }
    async login(email: string, password: string) {
        const worker = await this.workerModel.findOne({ email });
        if(!worker){
            return null;
        }
        const isMatch = await bcrypt.compare(password, worker.password);
        if(!isMatch){
            return null;
        }
        const payload = {email : worker.email, sub: worker._id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    
}
