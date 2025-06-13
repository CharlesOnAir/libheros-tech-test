import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { CreateUserUseCase } from '../use-cases/mutate/create-user.use-case';
import { LoginUserUseCase } from '../use-cases/query/login-user.use-case';
import { UserService } from './user.service';

const USE_CASES = [CreateUserUseCase, LoginUserUseCase];
const SERVICES = [UserService];

@Module({
  providers: [...USE_CASES, ...SERVICES],
  imports: [RepositoriesModule],
  exports: [...USE_CASES, ...SERVICES],
})
export class UserDomainModule {}
