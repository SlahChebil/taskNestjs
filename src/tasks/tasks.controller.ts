import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksilterDTO } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get()
    getTasks(@Query() filterDto:GetTasksilterDTO, @Getuser() user:User):Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string, @Getuser() user:User): Promise<Task> {
        return this.tasksService.getTaskById(id,user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string, @Getuser() user:User):Promise<void>{
        return this.tasksService.deleteTask(id,user);
    }
    
    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto, @Getuser() user:User):Promise<Task>{
        return this.tasksService.createTasks(createTaskDto,user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body() updateTaskStatusDto:updateTaskStatusDto, @Getuser() user:User):Promise<Task>{
        let {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status,user);
    }
}
