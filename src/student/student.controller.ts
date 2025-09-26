import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schema/student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    @Post()
    createStudent() {
        return this.studentService.createStudent();
    }

    @Get()
    getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Put(':id')
    updateStudent(@Param('id') id: string, @Body() updateData: Partial<Student>) {
        return this.studentService.updateStudent(id, updateData);
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
