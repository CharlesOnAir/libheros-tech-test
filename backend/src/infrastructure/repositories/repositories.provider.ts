import { Provider } from '@nestjs/common';
import {
  TASK_REPOSITORY,
  TASKS_LIST_REPOSITORY,
  USER_REPOSITORY,
} from 'src/domain/injection-tokens';
import { TaskListRepository } from 'src/domain/taskLists/task-list.repository';
import { TaskRepository } from 'src/domain/tasks/task.repository';
import { UserRepository } from 'src/domain/user/user.repository';
import { PrismaTasksListRepository } from './repositories/task-list.repository';
import { PrismaTaskRepository } from './repositories/task.repository';
import { PrismaUserRepository } from './repositories/user.repository';

export const UserRepositoryProvider: Provider<UserRepository> = {
  provide: USER_REPOSITORY,
  useClass: PrismaUserRepository,
};

export const TasksListRepositoryProvider: Provider<TaskListRepository> = {
  provide: TASKS_LIST_REPOSITORY,
  useClass: PrismaTasksListRepository,
};

export const TaskRepositoryProvider: Provider<TaskRepository> = {
  provide: TASK_REPOSITORY,
  useClass: PrismaTaskRepository,
};
