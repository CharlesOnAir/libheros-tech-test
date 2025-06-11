import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './authentification.dto';

@Controller('authentification')
@ApiTags('authentification')
export class AuthentificationController {
  constructor() {}

  @Post('register')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return {
      message: 'User created successfully',
    };
  }
}
