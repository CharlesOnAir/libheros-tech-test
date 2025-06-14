import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/domain/tasks/task.entity';
import { TaskService } from 'src/domain/tasks/task.service';
import { UseCase } from '../use-cases';

export type CompleteTaskResult = Task;

export interface CompleteTaskPort {
  taskId: string;
  userId: string;
}

@Injectable()
export class CompleteTaskUseCase
  implements UseCase<CompleteTaskPort, CompleteTaskResult>
{
  constructor(private taskService: TaskService) {}

  async execute({
    taskId,
    userId,
  }: CompleteTaskPort): Promise<CompleteTaskResult> {
    const task = await this.taskService.findOneByIdAndUserId(taskId, userId);

    if (!task) throw new NotFoundException('Task not found');

    return this.taskService.complete(taskId, userId);
  }
}
