import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './schema/employee.schema';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService:EmployeeService) {}

    @Post()
    createEmployee() {
        return this.employeeService.createEmployee();
    }

    @Get()
    getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }

    @Get(':id')
    getEmployeeById(@Param('id') id:string) {
        return this.employeeService.getEmployeeById(id);
    }

    @Put(':id')
    updateEmployee(@Param('id') id:string, @Body() updateData:Partial<Employee>) {
        return this.employeeService.updateEmployee(id, updateData);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id:string) {
        return this.employeeService.deleteEmployee(id);
    }
}
