import { ApiProperty } from '@nestjs/swagger';

export class TasksListDto {
  @ApiProperty({
    description: 'The id of the task list',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the task list',
    example: 'Task List 1',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task list',
    example: 'This is a task list',
  })
  description: string;

  @ApiProperty({
    description: 'The created at date of the task list',
    example: '2021-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the task list',
    example: '2021-01-01',
  })
  updatedAt: Date;
}

export class CreateTaskListDto {
  @ApiProperty({
    description: 'The title of the task list',
    example: 'Task List 1',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task list',
    example: 'This is a task list',
  })
  description: string;
}
