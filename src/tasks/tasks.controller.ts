import {
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Get all tasks
  @Get()
  findAll() {
    return this.tasksService.getTasks();
  }

  // Get a specific task by name
  @Get(':name')
  findOne(@Param('name') name: string) {
    try {
      return this.tasksService.getTaskByName(name);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Start a task
  @Post(':name/run')
  startTask(@Param('name') name: string) {
    return this.tasksService.startTask(name);
  }

  // Stop a task
  @Post(':name/stop')
  stopTask(@Param('name') name: string) {
    return this.tasksService.stopTask(name);
  }
}
