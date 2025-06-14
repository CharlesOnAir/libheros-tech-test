import { Injectable } from '@nestjs/common';
import { TaskList } from 'src/domain/taskLists/task-list.entity';
import { TaskListService } from 'src/domain/taskLists/task-list.service';
import { UseCase } from '../use-cases';

export type GetTasksListOfUserResult = TaskList[];

export interface GetTasksListOfUserPort {
  userId: string;
}

@Injectable()
export class GetTasksListOfUserUseCase
  implements UseCase<GetTasksListOfUserPort, GetTasksListOfUserResult>
{
  constructor(private tasksListService: TaskListService) {}

  async execute({
    userId,
  }: GetTasksListOfUserPort): Promise<GetTasksListOfUserResult> {
    return await this.tasksListService.getAllByUserId(userId);
  }
}
