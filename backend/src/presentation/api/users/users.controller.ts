import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
// @ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
export class UsersController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
  })
  async getUsers() {
    return [];
  }
}
