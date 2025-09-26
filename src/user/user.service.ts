import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserDocument, Users } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor( 
    @InjectModel(Users.name) private userModel: Model<UserDocument>
  ) {}
  private users:User[] = [
      { id: 1, name: 'John Doe', email: 'malik1@gmail.com' },
      { id: 2, name: 'Jane Smith', email: 'malik3@gmail.com' },
      { id: 3, name: 'Alice Johnson', email: 'malik4@gmail.com' },
      { id: 4, name: 'Bob Brown', email: 'malik5@gmail.com'},
      { id: 5, name: 'Charlie Davis', email: 'malik6@gmail.com' },
    ]
  // create(createUserDto: CreateUserDto): User {
  //   const newUser  = {
  //     id: this.users.length + 1,
  //     ...createUserDto
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  async create(data:Partial<Users>):Promise<Users>{
    const newUser = await this.userModel.create(data);
    return newUser.save();
  }

  findAll():Promise<Users[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string):Promise<Users | null> {
    const findUser = this.userModel.findById(id);
    if (!findUser) throw new NotFoundException(`User with ID ${id} not found`); // built-in HTTP exception
    return findUser;
  }

  update(id: string, data:Partial<Users>):Promise<Users | null> {
    const user = this.userModel.findByIdAndUpdate(id, {
      name: data.name ?? null,
      email: data.email ?? null
    }, {overwrite:true , new:true}).exec();
    if(!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  remove(id: string):Promise<Users | null> {
    const user = this.userModel.findByIdAndDelete(id);
    if(!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

    partialUpdate(id:string ,data:Partial<Users>):Promise<Users | null> {
    const user = this.userModel.findByIdAndUpdate(id, data, {new:true}).exec();
    if(!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // partialUpdate(id:number , partialUpdateUserDto: Partial<UpdateUserDto>) {
  //   const user = this.findOne(id);
  //   Object.assign(user, partialUpdateUserDto);
  //   return user;
  // }

  // remove(id: number) {
  // //  const user = this.findOne(id);
  // //  this.users = this.users.filter(u => u.id !== id);
  // const findUserIndex = this.users.findIndex(user => user.id === id);
  // if(findUserIndex === -1) throw new NotFoundException(`User with ID ${id} not found`);
  //  const deleted =  this.users.splice(findUserIndex, 1);// (index of that removed item , how many items to remove)
  //  return deleted[0]; // return the deleted user object
  // }
}
