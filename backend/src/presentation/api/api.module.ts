import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domain/user/user.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthentificationModule, UserDomainModule, TasksModule],
  controllers: [],
})
export class ApiModule {}
