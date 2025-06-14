import { Module } from '@nestjs/common';
import { TaskListDomainModule } from 'src/domain/tasksList/tasksList.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TaskListDomainModule],
  controllers: [TasksController],
})
export class TasksModule {}
