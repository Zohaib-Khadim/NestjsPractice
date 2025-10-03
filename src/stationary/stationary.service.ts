import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stationary } from './model/statinary.model';
import { Model } from 'mongoose';
import { CreateStationaryInput } from './dto/create-stationary.input';
import { UpdateStationaryInput } from './dto/update-stationary.input';

@Injectable()
export class StationaryService {
    constructor(@InjectModel(Stationary.name) private stationaryModel:Model<Stationary>) {}

    async craete(input:CreateStationaryInput):Promise<Stationary> {
        const newStationary = new this.stationaryModel(input);
        return newStationary.save();
    }
    
    async findAll():Promise<Stationary[]> { 
        return this.stationaryModel.find().exec();
    }

    async findOne(id:string):Promise<Stationary> {
        const stationary =  this.stationaryModel.findById(id).exec();
        if(!stationary) {
            throw new NotFoundException('No stationary found');
         }
        return stationary;
    }  
    async update(input:UpdateStationaryInput):Promise<Stationary> {
        const stationary =  this.stationaryModel.findByIdAndUpdate(input.id, input, {new:true}).exec();
        if(!stationary) {
            throw new NotFoundException('Stationary not found');
        }
        return stationary;
    }
    async remove(id:string):Promise<boolean> {
        const stationary =  this.stationaryModel.findByIdAndDelete(id).exec();
        if(!stationary) {
            throw new NotFoundException('Stationary not found');
        }
        return true;
    }
}
