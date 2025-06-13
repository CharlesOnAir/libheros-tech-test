import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { UserService } from 'src/domain/user/user.service';
import { UseCase } from '../use-cases';

export type LoginUserResult = {
  user: User;
  token: string;
};

export interface LoginUserPort {
  email: string;
  password: string;
}

@Injectable()
export class LoginUserUseCase
  implements UseCase<LoginUserPort, LoginUserResult>
{
  constructor(private userService: UserService) {}

  async execute({ email, password }: LoginUserPort): Promise<LoginUserResult> {
    const existingUser = await this.userService.findUserByEmail(email);

    if (!existingUser) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.userService.checkValidPassword(
      password,
      existingUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const token = this.userService.createToken(existingUser);

    return {
      user: existingUser,
      token,
    };
  }
}
