import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schema/employee.schema';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name:Employee.name, schema:EmployeeSchema},
    {name:Profile.name, schema:ProfileSchema}
  ])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
