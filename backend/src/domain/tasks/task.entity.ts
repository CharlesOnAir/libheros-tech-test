import { TaskStatus } from 'src/presentation/api/tasks/tasks.dto';
import { BaseEntity } from 'src/utils/types';

export interface Task extends BaseEntity {
  title: string;
  shortDescription: string;
  longDescription: string;
  endDate: Date;
  status: TaskStatus;
  tasksListsId: string;
}
