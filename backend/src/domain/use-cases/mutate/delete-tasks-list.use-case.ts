import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksList } from 'src/domain/tasksList/tasksList.entity';
import { TasksListService } from 'src/domain/tasksList/tasksList.service';
import { UseCase } from '../use-cases';

export type DeleteTasksListResult = TasksList;

export interface DeleteTasksListPort {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteTasksListUseCase
  implements UseCase<DeleteTasksListPort, DeleteTasksListResult>
{
  constructor(private tasksListService: TasksListService) {}

  async execute({
    id,
    userId,
  }: DeleteTasksListPort): Promise<DeleteTasksListResult> {
    const existingTasksList =
      await this.tasksListService.findTasksListByIdAndUserId(id, userId);

    if (!existingTasksList) throw new NotFoundException('Tasks list not found');

    return this.tasksListService.delete(id, userId);
  }
}
