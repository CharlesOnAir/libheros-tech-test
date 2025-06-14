import { Injectable } from '@nestjs/common';
import { TasksList } from 'src/domain/tasksList/tasksList.entity';
import { TasksListService } from 'src/domain/tasksList/tasksList.service';
import { UseCase } from '../use-cases';

export type GetTasksListOfUserResult = TasksList[];

export interface GetTasksListOfUserPort {
  userId: string;
}

@Injectable()
export class GetTasksListOfUserUseCase
  implements UseCase<GetTasksListOfUserPort, GetTasksListOfUserResult>
{
  constructor(private tasksListService: TasksListService) {}

  async execute({
    userId,
  }: GetTasksListOfUserPort): Promise<GetTasksListOfUserResult> {
    return await this.tasksListService.getAllByUserId(userId);
  }
}
