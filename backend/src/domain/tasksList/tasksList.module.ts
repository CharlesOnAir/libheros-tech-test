import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { CreateTasksListUseCase } from '../use-cases/mutate/create-tasks-list.use-case';
import { DeleteTasksListUseCase } from '../use-cases/mutate/delete-tasks-list.use-case';
import { GetTasksListOfUserUseCase } from '../use-cases/query/get-tasks-list-of-user.use-case';
import { TasksListService } from './tasksList.service';

const USE_CASES = [
  CreateTasksListUseCase,
  DeleteTasksListUseCase,
  GetTasksListOfUserUseCase,
];
const SERVICES = [TasksListService];

@Module({
  providers: [...USE_CASES, ...SERVICES],
  imports: [RepositoriesModule],
  exports: [...USE_CASES, ...SERVICES],
})
export class TaskListDomainModule {}
