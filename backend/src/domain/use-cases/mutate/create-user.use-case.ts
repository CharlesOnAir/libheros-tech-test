import { Injectable } from '@nestjs/common';
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
    return this.userService.createUser(user);
  }
}
