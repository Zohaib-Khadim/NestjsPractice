import { Injectable } from '@nestjs/common';
import { Employee } from './schema/employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schema/profile.schema';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name)private employeeMOdule:Model<Employee>,
        @InjectModel(Profile.name)private profileModel:Model<Profile>
) {}
    async createEmployee():Promise<Employee>{
        const profile = await new this.profileModel({
            age:30,
            qualification:'BSSE'
        }).save();
        const newEmployee = new this.employeeMOdule({
            name:'Jane Doe',
            email:'john@gmail.com',
            profile:profile._id

        });
        return newEmployee.save();
    }
    async getAllEmployees():Promise<Employee[]>{
        return this.employeeMOdule.find().populate('profile').exec();
    }
    async getEmployeeById(id:string):Promise<Employee>{
        return this.employeeMOdule.findById(id).populate('profile').exec();
    }
    async updateEmployee(id:string, updateData:Partial<Employee>):Promise<Employee>{
        return this.employeeMOdule.findByIdAndUpdate(id, updateData, {new:true}).exec();
    }
    async deleteEmployee(id:string):Promise<Employee>{
        return this.employeeMOdule.findByIdAndDelete(id).exec();
    }
}
