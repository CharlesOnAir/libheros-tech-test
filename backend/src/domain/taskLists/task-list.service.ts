import { Inject, Injectable } from '@nestjs/common';
import { TASKS_LIST_REPOSITORY } from '../injection-tokens';
import { CreateTaskList, TaskList } from './task-list.entity';
import { TaskListRepository } from './task-list.repository';

@Injectable()
export class TaskListService {
  constructor(
    @Inject(TASKS_LIST_REPOSITORY)
    private readonly taskListRepository: TaskListRepository,
  ) {}

  getAllByUserId = async (userId: string): Promise<TaskList[]> => {
    return this.taskListRepository.getAllByUserId(userId);
  };

  create = async (
    tasksList: CreateTaskList,
    userId: string,
  ): Promise<TaskList> => {
    return this.taskListRepository.create(tasksList, userId);
  };

  findTasksListByTitleAndUserId = async (
    title: string,
    userId: string,
  ): Promise<TaskList | null> => {
    return this.taskListRepository.findByTitleAndUserId(title, userId);
  };

  findTasksListByIdAndUserId = async (
    id: string,
    userId: string,
  ): Promise<TaskList | null> => {
    return this.taskListRepository.findByIdAndUserId(id, userId);
  };

  delete = async (id: string, userId: string): Promise<TaskList> => {
    return this.taskListRepository.delete(id, userId);
  };
}
