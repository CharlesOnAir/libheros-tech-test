import { BaseEntity, Mutable } from 'src/utils/types';
import { Task } from '../tasks/task.entity';

export interface CreateTaskList extends Mutable<Omit<TaskList, 'tasks'>> {}

export interface TaskList extends BaseEntity {
  title: string;
  description: string;
  tasks: Task[];
}
