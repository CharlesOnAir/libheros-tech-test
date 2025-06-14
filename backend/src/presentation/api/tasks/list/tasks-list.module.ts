import { Module } from '@nestjs/common';
import { TaskListDomainModule } from 'src/domain/taskLists/task-list.module';
import { TasksListController } from './tasks-list.controller';

@Module({
  imports: [TaskListDomainModule],
  controllers: [TasksListController],
})
export class TasksListModule {}
