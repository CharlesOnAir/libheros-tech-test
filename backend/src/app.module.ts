import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/repositories/prisma.service';
import { ApiModule } from './presentation/api/api.module';
import { AuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [ApiModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
