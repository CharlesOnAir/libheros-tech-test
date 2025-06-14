import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskListService } from 'src/domain/taskLists/task-list.service';
import { Task } from 'src/domain/tasks/task.entity';
import { TaskService } from 'src/domain/tasks/task.service';
import {
  CreateTaskDto,
  TaskStatus,
} from 'src/presentation/api/tasks/tasks.dto';
import { UseCase } from '../use-cases';

export type CreateTaskResult = Task;

export interface CreateTaskPort {
  task: CreateTaskDto;
  userId: string;
}

@Injectable()
export class CreateTaskUseCase
  implements UseCase<CreateTaskPort, CreateTaskResult>
{
  constructor(
    private taskService: TaskService,
    private taskListService: TaskListService,
  ) {}

  async execute({ task, userId }: CreateTaskPort): Promise<CreateTaskResult> {
    const taskList = await this.taskListService.findTasksListByIdAndUserId(
      task.tasksListsId,
      userId,
    );

    if (!taskList) throw new NotFoundException('Task list not found');

    return this.taskService.create(
      {
        ...task,
        status: TaskStatus.IN_PROGRESS,
        tasksListsId: taskList.id,
      },
      userId,
    );
  }
}
