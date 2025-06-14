import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompleteTaskUseCase } from 'src/domain/use-cases/mutate/complete-task.use-case';
import { CreateTaskUseCase } from 'src/domain/use-cases/mutate/create-task.use-case';
import { UncompleteTaskUseCase } from 'src/domain/use-cases/mutate/uncomplete-task.use-case';
import { JwtGuard } from 'src/presentation/auth/auth.guard';
import { CurrentUser } from 'src/presentation/auth/user.decorator';
import { CreateTaskDto, TaskDto } from './tasks.dto';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly completeTaskUseCase: CompleteTaskUseCase,
    private readonly uncompleteTaskUseCase: UncompleteTaskUseCase,
  ) {}

  @Post()
  async createTask(
    @CurrentUser() userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.createTaskUseCase.execute({
      task: createTaskDto,
      userId,
    });
  }

  @Patch(':id/complete')
  async completeTask(
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ): Promise<TaskDto> {
    return this.completeTaskUseCase.execute({ taskId: id, userId });
  }

  @Patch(':id/uncomplete')
  async uncompleteTask(
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ): Promise<TaskDto> {
    return this.uncompleteTaskUseCase.execute({ taskId: id, userId });
  }
}
