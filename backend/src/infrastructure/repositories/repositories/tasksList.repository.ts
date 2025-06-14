import { Injectable } from '@nestjs/common';
import { TasksList } from 'src/domain/tasksList/tasksList.entity';
import { TasksListRepository } from 'src/domain/tasksList/tasksList.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTasksListRepository implements TasksListRepository {
  constructor(private prisma: PrismaService) {}

  getAllByUserId = async (userId: string): Promise<TasksList[]> => {
    return this.prisma.tasksLists.findMany({ where: { userId } });
  };

  create = async (
    taskList: Omit<TasksList, 'id'>,
    userId: string,
  ): Promise<TasksList> => {
    return this.prisma.tasksLists.create({
      data: { ...taskList, userId },
    });
  };

  findByTitleAndUserId = async (
    title: string,
    userId: string,
  ): Promise<TasksList | null> => {
    return this.prisma.tasksLists.findFirst({
      where: { title, userId },
    });
  };

  findByIdAndUserId = async (
    id: string,
    userId: string,
  ): Promise<TasksList | null> => {
    return this.prisma.tasksLists.findFirst({ where: { id, userId } });
  };

  delete = async (id: string, userId: string): Promise<TasksList> => {
    return this.prisma.tasksLists.delete({ where: { id, userId } });
  };
}
