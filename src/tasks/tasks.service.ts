import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel : Model<Task>,){}

  async create(createTaskDto: CreateTaskDto,userId : string) {

    const task = new this.taskModel({...createTaskDto,userId:userId})
    const newTask = await task.save()

    if(newTask) {
      return true
    } 
    
    throw new HttpException('Sorry, Try later', HttpStatus.BAD_REQUEST)        
  }

  async remove(id: string) {    

    try {
      const del = await this.taskModel.deleteOne({_id:id})
    
      if(del.deletedCount > 0){
        return true
      }
    } catch (error) {
      throw new HttpException('Error when deleting', HttpStatus.BAD_REQUEST)
    }
   

    
  }

  async update(id:string,status:boolean){

    try {
            
      const task = await this.taskModel.findByIdAndUpdate(id,{status:status})            
      if(task) return true
      
    } catch (error) {
      throw new HttpException('Sorry, Try later', HttpStatus.BAD_REQUEST)
    }    
  }


  async getAllByUserId(id:string){
    const tasks = await this.taskModel.find({userId:id})
    return tasks
  }
}
