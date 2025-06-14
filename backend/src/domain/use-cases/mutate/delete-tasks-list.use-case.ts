import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskList } from 'src/domain/taskLists/task-list.entity';
import { TaskListService } from 'src/domain/taskLists/task-list.service';
import { UseCase } from '../use-cases';

export type DeleteTasksListResult = TaskList;

export interface DeleteTasksListPort {
  id: string;
  userId: string;
}

@Injectable()
export class DeleteTasksListUseCase
  implements UseCase<DeleteTasksListPort, DeleteTasksListResult>
{
  constructor(private tasksListService: TaskListService) {}

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
