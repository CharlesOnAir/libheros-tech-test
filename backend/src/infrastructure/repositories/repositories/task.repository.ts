import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Task } from 'src/domain/tasks/task.entity';
import { TaskRepository } from 'src/domain/tasks/task.repository';
import { TaskStatus } from 'src/presentation/api/tasks/tasks.dto';
import { Mutable } from 'src/utils/types';
import { PrismaService } from '../prisma.service';

const mapToEntity = (
  task: Prisma.TasksGetPayload<{
    include: {
      tasksLists: true;
    };
  }>,
): Task => {
  return { ...task, status: task.status as TaskStatus };
};

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  findOneByIdAndUserId = async (
    taskId: string,
    userId: string,
  ): Promise<Task> => {
    return await this.prisma.tasks
      .findUnique({
        where: {
          id: taskId,
          tasksLists: {
            userId,
          },
        },
        include: {
          tasksLists: true,
        },
      })
      .then(mapToEntity);
  };

  create = async (task: Mutable<Task>): Promise<Task> => {
    const result = await this.prisma.tasks.create({
      data: {
        ...task,
        status: task.status as TaskStatus,
      },
    });
    return {
      ...result,
      status: result.status as TaskStatus,
    };
  };

  complete = async (taskId: string): Promise<Task> => {
    return await this.prisma.tasks
      .update({
        where: { id: taskId },
        data: { status: TaskStatus.COMPLETED },
      })
      .then(mapToEntity);
  };

  uncomplete = async (taskId: string): Promise<Task> => {
    return await this.prisma.tasks
      .update({
        where: { id: taskId },
        data: { status: TaskStatus.IN_PROGRESS },
      })
      .then(mapToEntity);
  };
}
