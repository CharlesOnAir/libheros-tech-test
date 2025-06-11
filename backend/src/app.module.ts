import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/repositories/prisma.service';
import { ApiModule } from './presentation/api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
