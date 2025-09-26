import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher)private employeeRepository:Repository<Teacher>){}
    async create (teacherData:Partial<Teacher>):Promise<Teacher>{
        const teacher=this.employeeRepository.create(teacherData)
        return this.employeeRepository.save(teacher)
    }
    async findAll():Promise<Teacher[]>{
        return this.employeeRepository.find()
    }
    async findOne(id:number):Promise<Teacher | null>{
        return this.employeeRepository.findOneBy({id})
    }
    async update(id:number,updateData:Partial<Teacher>):Promise<Teacher>{
        await this.employeeRepository.update(id,updateData)
        return this.employeeRepository.findOneBy({id}) as Promise<Teacher>
    }
    async remove(id:number):Promise<void>{
        await this.employeeRepository.delete(id)
    } 
    async search(filters:{name?:string,subject?:string,department?:string}):Promise<Teacher[]>{
        const query=this.employeeRepository.createQueryBuilder('teacher')
        if(filters.name){
            query.andWhere('teacher.name ILIKE :name',{name:`%${filters.name}%`})
        }
        if(filters.subject){
            query.andWhere('teacher.subject LIKE :subject',{subject:`%${filters.subject}%`})
        }
        if(filters.department){
            query.andWhere('teacher.department ILIKE :department',{department:`%${filters.department}%`})
        }
        return query.getMany()
    }
}
