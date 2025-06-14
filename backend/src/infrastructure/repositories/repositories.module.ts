import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  TaskRepositoryProvider,
  TasksListRepositoryProvider,
  UserRepositoryProvider,
} from './repositories.provider';

const repositories = [
  UserRepositoryProvider,
  TasksListRepositoryProvider,
  TaskRepositoryProvider,
];

@Module({
  providers: [PrismaService, ...repositories],
  exports: [PrismaService, ...repositories],
})
export class RepositoriesModule {}
