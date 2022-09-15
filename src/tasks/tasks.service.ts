import { Injectable, NotFoundException } from '@nestjs/common';
import {TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { Getuser } from 'src/auth/get-user.decorator';
import { userInfo } from 'os';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository:TaskRepository,){}

        async getTaskById(id:string, @Getuser() user:User): Promise<Task> {
            const found = await this.tasksRepository.findOne({where: {id,user}});
            if(!found){
                throw new NotFoundException(`task not found with id=${id}`);
            }
            return found;
        }
        
        createTasks(createTaskDto:CreateTaskDto, user:User):Promise<Task>{
            return this.tasksRepository.createTasks(createTaskDto,user);
        }

        // async getAllTasks(): Promise<Task[]>{
        //         return this.tasksRepository.f;
        //     }

    async getTasks(filterDto:GetTasksilterDTO, user:User):Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto,user);
    }



    async deleteTask(id:string, user:User): Promise<void>{
        const result = await this.tasksRepository.delete(id);   
        if(result.affected==0){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatus(id:string, status:TaskStatus, user:User):Promise<Task>{
        const task = await this.getTaskById(id,user);
        task.status=status;
        await this.tasksRepository.save(task);
        return task;
    }
}