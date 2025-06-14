import { Mutable } from 'src/utils/types';
import { TasksList } from './tasksList.entity';

export interface TasksListRepository {
  getAllByUserId: (userId: string) => Promise<TasksList[]>;
  create: (taskList: Mutable<TasksList>, userId: string) => Promise<TasksList>;
  findByTitleAndUserId: (
    title: string,
    userId: string,
  ) => Promise<TasksList | null>;
  findByIdAndUserId: (id: string, userId: string) => Promise<TasksList | null>;
  delete: (id: string, userId: string) => Promise<TasksList>;
}
