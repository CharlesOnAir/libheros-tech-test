import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/presentation/auth/auth.guard';

@Controller('tasks')
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TasksController {
  constructor() {}

  @Get()
  async getTasks() {
    return 'tasks';
  }
}
