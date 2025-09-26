import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService:TeacherService){}
    @Post()
    async createTeacher(@Body() teacherData:Partial<Teacher>):Promise<Teacher>{
        return this.teacherService.create(teacherData)
    }
    @UseGuards(SupabaseAuthGuard)
    @Get()
    async getAllTeachers():Promise<Teacher[]>{
        return this.teacherService.findAll()
    }
    @Get('search')
    async searchTeachers(@Query('name')name?:string,@Query('subject')subject?:string,@Query('department')department?:string):Promise<Teacher[]>{
        return this.teacherService.search({name,subject,department})
    }
    @Get(':id')
    async getTeacherById(@Param('id') id:number):Promise<Teacher | null>{
        return this.teacherService.findOne(id)
    }
    @Put(':id')
    async updateTeacher(@Param('id') id:number,@Body() updateData:Partial<Teacher>):Promise<Teacher>{
        return this.teacherService.update(id,updateData)
    }
    @Delete(':id')
    async deleteTeacher(@Param('id') id:number):Promise<{message:string}>{
        await this.teacherService.remove(id)
        return {message:`Teacher with id ${id} has been deleted`}
    }

}