import { Provider } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/domain/injection-tokens';
import { UserRepository } from 'src/domain/user/user.repository';
import { PrismaUserRepository } from './repositories/user.repository';

export const UserRepositoryProvider: Provider<UserRepository> = {
  provide: USER_REPOSITORY,
  useClass: PrismaUserRepository,
};
