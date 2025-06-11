import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../injection-tokens';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  createUser = (user: Omit<User, 'id'>): Promise<User> => {
    return this.userRepository.create(user);
  };
}
