import { Mutable } from 'src/utils/types';
import { Task } from './task.entity';

export interface TaskRepository {
  findOneByIdAndUserId: (taskId: string, userId: string) => Promise<Task>;
  create: (task: Mutable<Task>, userId: string) => Promise<Task>;
  complete: (taskId: string, userId: string) => Promise<Task>;
  uncomplete: (taskId: string, userId: string) => Promise<Task>;
}
