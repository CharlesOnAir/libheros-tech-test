import { Injectable } from '@nestjs/common';
import { TaskList } from 'src/domain/taskLists/task-list.entity';
import { TaskListRepository } from 'src/domain/taskLists/task-list.repository';
import { TaskStatus } from 'src/presentation/api/tasks/tasks.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTasksListRepository implements TaskListRepository {
  constructor(private prisma: PrismaService) {}

  private toDomain(prismaTaskList: any): TaskList {
    return {
      ...prismaTaskList,
      tasks:
        prismaTaskList.tasks?.map((task) => ({
          ...task,
          status: task.status as TaskStatus,
        })) || [],
    };
  }

  getAllByUserId = async (userId: string): Promise<TaskList[]> => {
    const result = await this.prisma.tasksLists.findMany({
      where: { userId },
      include: { tasks: true },
    });
    return result.map(this.toDomain);
  };

  create = async (
    taskList: Omit<TaskList, 'id'>,
    userId: string,
  ): Promise<TaskList> => {
    const { tasks, ...data } = taskList;
    const result = await this.prisma.tasksLists.create({
      data: { ...data, userId },
      include: { tasks: true },
    });
    return this.toDomain(result);
  };

  findByTitleAndUserId = async (
    title: string,
    userId: string,
  ): Promise<TaskList | null> => {
    const result = await this.prisma.tasksLists.findFirst({
      where: { title, userId },
      include: { tasks: true },
    });
    return result ? this.toDomain(result) : null;
  };

  findByIdAndUserId = async (
    id: string,
    userId: string,
  ): Promise<TaskList | null> => {
    const result = await this.prisma.tasksLists.findFirst({
      where: { id, userId },
      include: { tasks: true },
    });
    return result ? this.toDomain(result) : null;
  };

  delete = async (id: string, userId: string): Promise<TaskList> => {
    const result = await this.prisma.tasksLists.delete({
      where: { id, userId },
      include: { tasks: true },
    });
    return this.toDomain(result);
  };
}
