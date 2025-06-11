import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { CreateUserUseCase } from '../use-cases/mutate/create-user.use-case';

const USE_CASES = [CreateUserUseCase];
const SERVICES = [];

@Module({
  providers: [...USE_CASES, ...SERVICES],
  imports: [RepositoriesModule],
  exports: [...USE_CASES, ...SERVICES],
})
export class UserDomainModule {}
