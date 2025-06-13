import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { UseCase } from '../use-cases';

export type LoginUserResult = string;

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

    return this.userService.createToken(existingUser);
  }
}
