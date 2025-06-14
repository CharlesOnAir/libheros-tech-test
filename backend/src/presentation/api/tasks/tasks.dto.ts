import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'This is a task',
  })
  shortDescription: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'This is a task',
  })
  longDescription: string;

  @ApiProperty({
    description: 'The end date of the task',
    example: '2021-01-01T00:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'The id of the task list that the task belongs to',
    example: 'dehjdzehjdze-bahdydje-dhehj-dhehj-dhehj',
  })
  tasksListsId: string;
}

export class TaskDto {
  @ApiProperty({
    description: 'The id of the task',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    description: 'The short description of the task',
    example: 'This is a task',
  })
  shortDescription: string;

  @ApiProperty({
    description: 'The long description of the task',
    example: 'This is a task',
  })
  longDescription: string;

  @ApiProperty({
    description: 'The end date of the task',
    example: '2021-01-01T00:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'The status of the task',
    example: TaskStatus.IN_PROGRESS,
    enum: TaskStatus,
  })
  status: TaskStatus;
}
