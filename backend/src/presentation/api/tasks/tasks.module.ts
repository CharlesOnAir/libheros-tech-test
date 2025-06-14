import { Module } from '@nestjs/common';
import { TasksDomainModule } from 'src/domain/tasks/task.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TasksDomainModule],
  controllers: [TasksController],
})
export class TasksModule {}
