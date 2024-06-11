import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTodo } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { generateToken } from './auth/generateTokken';


@Injectable()
export class UsersService {
 

  constructor(
  @InjectModel(UserTodo.name) private userModel : Model<UserTodo>,
  
  ){}


  async create(createUserDto: CreateUserDto) {
    const userExist = await this.findUser(createUserDto.email)          

    if(!userExist){

      const hashpassword = await this.encript(createUserDto.password)
      
      const user = new this.userModel({...createUserDto, password:hashpassword})

      const userCreated = await user.save()
      
      if(userCreated){

        return await generateToken({id: userCreated._id})          


      }else{        
        throw new HttpException('Sorry, Try later', HttpStatus.BAD_REQUEST)
      }
      
    }else{      
      throw new HttpException('User alredy exist', HttpStatus.BAD_REQUEST)
    }
  }

  async login (dataUser : CreateUserDto){

    const user = await this.findUser(dataUser.email)
        
    if(user){
      
      const checkPassword = await this.comparePassword(dataUser.password,user.password)
      
      if(checkPassword){
        
        

      return await generateToken({id: user._id})          

      }else{        
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST)
      }

    }else{
      throw new HttpException('Email not found', HttpStatus.BAD_REQUEST)
    }    

  }



  async findUser(email:string) {
    const exist = await this.userModel.findOne({email})
    return exist
  }

  async encript (pass: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
  }

  async comparePassword (receivedPassword:string, password:string){
    const same = await bcrypt.compare(receivedPassword, password);
    return !!same;
  }




}
