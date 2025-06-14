import { Provider } from '@nestjs/common';
import {
  TASKS_LIST_REPOSITORY,
  USER_REPOSITORY,
} from 'src/domain/injection-tokens';
import { TasksListRepository } from 'src/domain/tasksList/tasksList.repository';
import { UserRepository } from 'src/domain/user/user.repository';
import { PrismaTasksListRepository } from './repositories/tasksList.repository';
import { PrismaUserRepository } from './repositories/user.repository';

export const UserRepositoryProvider: Provider<UserRepository> = {
  provide: USER_REPOSITORY,
  useClass: PrismaUserRepository,
};

export const TasksListRepositoryProvider: Provider<TasksListRepository> = {
  provide: TASKS_LIST_REPOSITORY,
  useClass: PrismaTasksListRepository,
};
