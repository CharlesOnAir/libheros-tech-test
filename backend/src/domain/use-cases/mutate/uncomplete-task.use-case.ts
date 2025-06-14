import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/domain/tasks/task.entity';
import { TaskService } from 'src/domain/tasks/task.service';
import { UseCase } from '../use-cases';

export type UncompleteTaskResult = Task;

export interface UncompleteTaskPort {
  taskId: string;
  userId: string;
}

@Injectable()
export class UncompleteTaskUseCase
  implements UseCase<UncompleteTaskPort, UncompleteTaskResult>
{
  constructor(private taskService: TaskService) {}

  async execute({
    taskId,
    userId,
  }: UncompleteTaskPort): Promise<UncompleteTaskResult> {
    const task = await this.taskService.findOneByIdAndUserId(taskId, userId);

    if (!task) throw new NotFoundException('Task not found');

    return this.taskService.uncomplete(taskId, userId);
  }
}
