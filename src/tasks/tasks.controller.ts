import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ChecktokenGuard } from './checktoken/checktoken.guard';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(ChecktokenGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {    
    return this.tasksService.create(createTaskDto,req.user.id);
  }
  
  @Delete(':id')
  @UseGuards(ChecktokenGuard)
  remove(@Param('id') id: string) {    
    return this.tasksService.remove(id);
  }

  @Patch(':id')
  @UseGuards(ChecktokenGuard)
  update(@Param('id') id:string, @Body() updateTasDto : UpdateTaskDto ) {
    return this.tasksService.update(id,updateTasDto.status)
  }


  @Get()
  @UseGuards(ChecktokenGuard)
  getAllByUserId(@Request() req){
    return this.tasksService.getAllByUserId(req.user.id)
  }


}
