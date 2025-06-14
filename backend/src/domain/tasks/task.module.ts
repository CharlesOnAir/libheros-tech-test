import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { TaskListService } from '../taskLists/task-list.service';
import { CompleteTaskUseCase } from '../use-cases/mutate/complete-task.use-case';
import { CreateTaskUseCase } from '../use-cases/mutate/create-task.use-case';
import { UncompleteTaskUseCase } from '../use-cases/mutate/uncomplete-task.use-case';
import { TaskService } from './task.service';

const USE_CASES = [
  CreateTaskUseCase,
  CompleteTaskUseCase,
  UncompleteTaskUseCase,
];
const SERVICES = [TaskService, TaskListService];

@Module({
  providers: [...USE_CASES, ...SERVICES],
  imports: [RepositoriesModule],
  exports: [...USE_CASES, ...SERVICES],
})
export class TasksDomainModule {}
