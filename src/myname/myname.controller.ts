import { Body, Controller, Get, Param, ParseIntPipe, Post, UseFilters } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('myname')
export class MynameController {
    @Post()
    getMyName(@Body('name',new UppercasePipe()) name: string) {
        return {messgae:`My name is ${name}`};
    }
    @Get(':id')
    @UseFilters(HttpExceptionFilter)
    getById(@Param('id',ParseIntPipe) id:number){ 
        return {messgae:`This is get by id`};
    }
}
