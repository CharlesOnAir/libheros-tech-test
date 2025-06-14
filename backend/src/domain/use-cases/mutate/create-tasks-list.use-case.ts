import { ConflictException, Injectable } from '@nestjs/common';
import { TasksList } from 'src/domain/tasksList/tasksList.entity';
import { TasksListService } from 'src/domain/tasksList/tasksList.service';
import { CreateTaskListDto } from 'src/presentation/api/tasks/tasks.dto';
import { UseCase } from '../use-cases';

export type CreateTasksListResult = TasksList;

export interface CreateTasksListPort {
  taskList: CreateTaskListDto;
  userId: string;
}

@Injectable()
export class CreateTasksListUseCase
  implements UseCase<CreateTasksListPort, CreateTasksListResult>
{
  constructor(private tasksListService: TasksListService) {}

  async execute({
    taskList,
    userId,
  }: CreateTasksListPort): Promise<CreateTasksListResult> {
    const existingTasksList =
      await this.tasksListService.findTasksListByTitleAndUserId(
        taskList.title,
        userId,
      );

    if (existingTasksList)
      throw new ConflictException('Tasks list already exists');

    return this.tasksListService.create(taskList, userId);
  }
}
