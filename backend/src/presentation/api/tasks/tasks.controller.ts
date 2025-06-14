import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTasksListUseCase } from 'src/domain/use-cases/mutate/create-tasks-list.use-case';
import { DeleteTasksListUseCase } from 'src/domain/use-cases/mutate/delete-tasks-list.use-case';
import { GetTasksListOfUserUseCase } from 'src/domain/use-cases/query/get-tasks-list-of-user.use-case';
import { JwtGuard } from 'src/presentation/auth/auth.guard';
import { CurrentUser } from 'src/presentation/auth/user.decorator';
import { CreateTaskListDto, TasksListDto } from './tasks.dto';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TasksController {
  constructor(
    private readonly createTasksListUseCase: CreateTasksListUseCase,
    private readonly deleteTasksListUseCase: DeleteTasksListUseCase,
    private readonly getTasksListOfUserUseCase: GetTasksListOfUserUseCase,
  ) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get all task lists of user',
  })
  @ApiOkResponse({
    description: 'Task lists fetched successfully',
    type: [TasksListDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getTasksLists(@CurrentUser() userId: string): Promise<TasksListDto[]> {
    return this.getTasksListOfUserUseCase.execute({ userId });
  }

  @Post('list')
  @ApiOperation({
    summary: 'Create a new task list',
  })
  @ApiBody({
    type: CreateTaskListDto,
  })
  @ApiCreatedResponse({
    description: 'Task list created successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiConflictResponse({
    description: 'Task list already exists with this title',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async createTaskList(
    @Body() createTaskListDto: CreateTaskListDto,
    @CurrentUser() userId: string,
  ): Promise<TasksListDto> {
    return this.createTasksListUseCase.execute({
      taskList: createTaskListDto,
      userId,
    });
  }

  @Delete('list/:id')
  @ApiOperation({
    summary: 'Delete a task list',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    description: 'Task list deleted successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiNotFoundResponse({
    description: 'Task list not found',
  })
  async deleteTaskList(
    @Param('id') id: string,
    @CurrentUser() userId: string,
  ): Promise<TasksListDto> {
    return this.deleteTasksListUseCase.execute({ id, userId });
  }
}
