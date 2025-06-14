import { Injectable } from '@nestjs/common';
import { TaskList } from 'src/domain/taskLists/task-list.entity';
import { TaskListRepository } from 'src/domain/taskLists/task-list.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTasksListRepository implements TaskListRepository {
  constructor(private prisma: PrismaService) {}

  getAllByUserId = async (userId: string): Promise<TaskList[]> => {
    return this.prisma.tasksLists.findMany({ where: { userId } });
  };

  create = async (
    taskList: Omit<TaskList, 'id'>,
    userId: string,
  ): Promise<TaskList> => {
    return this.prisma.tasksLists.create({
      data: { ...taskList, userId },
    });
  };

  findByTitleAndUserId = async (
    title: string,
    userId: string,
  ): Promise<TaskList | null> => {
    return this.prisma.tasksLists.findFirst({
      where: { title, userId },
    });
  };

  findByIdAndUserId = async (
    id: string,
    userId: string,
  ): Promise<TaskList | null> => {
    return this.prisma.tasksLists.findFirst({ where: { id, userId } });
  };

  delete = async (id: string, userId: string): Promise<TaskList> => {
    return this.prisma.tasksLists.delete({ where: { id, userId } });
  };
}
