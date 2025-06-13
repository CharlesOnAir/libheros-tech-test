import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserService } from 'src/domain/user/user.service';
import { CreateUserDto } from 'src/presentation/api/authentification/authentification.dto';
import { isSameString } from 'src/utils/string';
import { UseCase } from '../use-cases';

export type CreateUserResult = User;

export interface CreateUserPort {
  user: CreateUserDto;
}

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserPort, CreateUserResult>
{
  constructor(private userService: UserService) {}

  async execute({ user }: CreateUserPort): Promise<CreateUserResult> {
    if (!isSameString(user.email, user.emailConfirmation))
      throw new BadRequestException('Emails do not match');

    if (!isSameString(user.password, user.passwordConfirmation))
      throw new BadRequestException('Passwords do not match');

    const existingUser = await this.userService.findUserByEmail(user.email);

    if (existingUser)
      throw new ConflictException(
        'User already exists with this email address',
      );

    return this.userService.createUser({
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      password: user.password,
    });
  }
}
