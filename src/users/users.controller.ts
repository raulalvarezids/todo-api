import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {    
    return await this.usersService.create(createUserDto);
    
  }


  @Post('/login')
  async login(@Body() dataUser : CreateUserDto){
    return await this.usersService.login(dataUser)
  }

}
