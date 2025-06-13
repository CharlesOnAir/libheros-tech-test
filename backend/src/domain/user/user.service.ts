import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/app.constants';
import { USER_REPOSITORY } from '../injection-tokens';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  private encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  createToken = (user: User): string => {
    return jwt.sign({ id: user.id }, JWT_SECRET);
  };

  checkValidPassword = async (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  };

  findUserByEmail = (email: string): Promise<User | null> => {
    return this.userRepository.findByEmail(email);
  };

  createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    return this.userRepository.create({
      ...user,
      password: await this.encryptPassword(user.password),
    });
  };
}
