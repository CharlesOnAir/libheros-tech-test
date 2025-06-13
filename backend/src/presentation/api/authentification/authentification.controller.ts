import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/domain/use-cases/mutate/create-user.use-case';
import { LoginUserUseCase } from 'src/domain/use-cases/query/login-user.use-case';
import {
  CreateUserDto,
  CreateUserResponse,
  LoginDto,
  LoginUserResponse,
} from './authentification.dto';
import {
  mapToLoginUserResponse,
  toUserResponse,
} from './authentification.mapper';

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
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginUserResponse,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginUserResponse> {
    return this.loginUserUseCase
      .execute(loginDto)
      .then(({ user, token }) => mapToLoginUserResponse(user, token));
  }

  @Post('register')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserResponse,
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
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return this.createUserUseCase
      .execute({
        user: createUserDto,
      })
      .then(toUserResponse);
  }
}
