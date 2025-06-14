import { Inject, Injectable } from '@nestjs/common';
import { Mutable } from 'src/utils/types';
import { TASKS_LIST_REPOSITORY } from '../injection-tokens';
import { TasksList } from './tasksList.entity';
import { TasksListRepository } from './tasksList.repository';

@Injectable()
export class TasksListService {
  constructor(
    @Inject(TASKS_LIST_REPOSITORY)
    private readonly tasksListRepository: TasksListRepository,
  ) {}

  getAllByUserId = async (userId: string): Promise<TasksList[]> => {
    return this.tasksListRepository.getAllByUserId(userId);
  };

  create = async (
    tasksList: Mutable<TasksList>,
    userId: string,
  ): Promise<TasksList> => {
    return this.tasksListRepository.create(tasksList, userId);
  };

  findTasksListByTitleAndUserId = async (
    title: string,
    userId: string,
  ): Promise<TasksList | null> => {
    return this.tasksListRepository.findByTitleAndUserId(title, userId);
  };

  findTasksListByIdAndUserId = async (
    id: string,
    userId: string,
  ): Promise<TasksList | null> => {
    return this.tasksListRepository.findByIdAndUserId(id, userId);
  };

  delete = async (id: string, userId: string): Promise<TasksList> => {
    return this.tasksListRepository.delete(id, userId);
  };
}
