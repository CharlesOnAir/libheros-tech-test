import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

const repositories = [];

@Module({
  providers: [PrismaService, ...repositories],
  exports: [PrismaService, ...repositories],
})
export class RepositoriesModule {}
