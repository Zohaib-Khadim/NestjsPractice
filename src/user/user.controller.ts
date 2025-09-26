import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from 'src/guards/auth/auth.guard';
// import { RolesGuard } from 'src/guards/roles/roles.guard';
// import { Role } from 'src/guards/roles/roles.enum';
// import { Roles } from 'src/guards/roles/roles.decorator';
import { Users } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // Dependency Injection

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Post()
  async create(@Body() data:Partial<Users>) {
    return this.userService.create(data);
  }

  // @Get()
  // // @UseGuards(AuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  findAll():Promise<Users[]> {
    return this.userService.findAll();
  }

  // @Get(':id')
  // @UseGuards(RolesGuard)
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(Number(id));// +id is also fine
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data:Partial<Users>) {
    return this.userService.update(id, data);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto); //(Number(id)) is also fine
  // }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() data:Partial<Users>) {
    return this.userService.update(id, data); 
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
