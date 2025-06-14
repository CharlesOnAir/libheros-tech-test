import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domain/user/user.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { TasksListModule } from './tasks/list/tasks-list.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthentificationModule,
    UserDomainModule,
    TasksListModule,
    TasksModule,
  ],
  controllers: [],
})
export class ApiModule {}
