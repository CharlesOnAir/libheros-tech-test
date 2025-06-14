import { Inject, Injectable } from '@nestjs/common';
import { Mutable } from 'src/utils/types';
import { TASK_REPOSITORY } from '../injection-tokens';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  create = async (task: Mutable<Task>, userId: string): Promise<Task> => {
    return this.taskRepository.create(task, userId);
  };

  findOneByIdAndUserId = async (
    taskId: string,
    userId: string,
  ): Promise<Task> => {
    return this.taskRepository.findOneByIdAndUserId(taskId, userId);
  };

  complete = async (taskId: string, userId: string): Promise<Task> => {
    return this.taskRepository.complete(taskId, userId);
  };

  uncomplete = async (taskId: string, userId: string): Promise<Task> => {
    return this.taskRepository.uncomplete(taskId, userId);
  };
}
