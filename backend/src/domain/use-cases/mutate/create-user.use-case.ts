import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserService } from 'src/domain/user/user.service';
import { UseCase } from '../use-cases';

export type CreateUserResult = User;

export interface CreateUserPort {
  user: Omit<User, 'id'>;
}

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserPort, CreateUserResult>
{
  constructor(private userService: UserService) {}

  async execute({ user }: CreateUserPort): Promise<CreateUserResult> {
    const existingUser = await this.userService.findUserByEmail(user.email);

    if (existingUser)
      throw new ConflictException(
        'User already exists with this email address',
      );

    return this.userService.createUser(user);
  }
}
