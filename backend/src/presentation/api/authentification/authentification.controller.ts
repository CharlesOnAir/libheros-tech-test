import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/domain/use-cases/mutate/create-user.use-case';
import { LoginUserUseCase } from 'src/domain/use-cases/query/login-user.use-case';
import { CreateUserDto, LoginDto } from './authentification.dto';
import { toUserResponse } from './authentification.mapper';

@Controller('authentification')
@ApiTags('authentification')
export class AuthentificationController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login a user with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.loginUserUseCase.execute(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiConflictResponse({
    description: 'User already exists with this email address',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase
      .execute({
        user: createUserDto,
      })
      .then(toUserResponse);
  }
}
