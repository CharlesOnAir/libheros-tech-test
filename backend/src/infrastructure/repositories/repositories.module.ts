import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  TasksListRepositoryProvider,
  UserRepositoryProvider,
} from './repositories.provider';

const repositories = [UserRepositoryProvider, TasksListRepositoryProvider];

@Module({
  providers: [PrismaService, ...repositories],
  exports: [PrismaService, ...repositories],
})
export class RepositoriesModule {}
