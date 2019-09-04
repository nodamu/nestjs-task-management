import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param() id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }
}
