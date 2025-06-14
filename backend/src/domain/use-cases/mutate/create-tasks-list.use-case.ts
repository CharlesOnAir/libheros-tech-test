import { ConflictException, Injectable } from '@nestjs/common';
import { TaskList } from 'src/domain/taskLists/task-list.entity';
import { TaskListService } from 'src/domain/taskLists/task-list.service';
import { CreateTaskListDto } from 'src/presentation/api/tasks/list/tasks-list.dto';
import { UseCase } from '../use-cases';

export type CreateTasksListResult = TaskList;

export interface CreateTasksListPort {
  taskList: CreateTaskListDto;
  userId: string;
}

@Injectable()
export class CreateTasksListUseCase
  implements UseCase<CreateTasksListPort, CreateTasksListResult>
{
  constructor(private tasksListService: TaskListService) {}

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
