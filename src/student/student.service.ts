import { Injectable } from '@nestjs/common';
import { Student } from './schema/student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async createStudent(): Promise<Student> {
    const newStudent = new this.studentModel({
      name: 'John Doe',
      email: 'malik@gmail.com',
      address: { 
        street: '123 Main St',
        city: 'New York' 
      },
    });
    return newStudent.save();
  }

    async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }

  async updateStudent(id: string, updateData: Partial<Student>): Promise<Student> {
    return this.studentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteStudent(id: string): Promise<Student> {
    return this.studentModel.findByIdAndDelete(id).exec();
  } 
}
