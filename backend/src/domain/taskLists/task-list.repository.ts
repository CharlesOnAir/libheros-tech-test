import { CreateTaskList, TaskList } from './task-list.entity';

export interface TaskListRepository {
  getAllByUserId: (userId: string) => Promise<TaskList[]>;
  create: (taskList: CreateTaskList, userId: string) => Promise<TaskList>;
  findByTitleAndUserId: (
    title: string,
    userId: string,
  ) => Promise<TaskList | null>;
  findByIdAndUserId: (id: string, userId: string) => Promise<TaskList | null>;
  delete: (id: string, userId: string) => Promise<TaskList>;
}
