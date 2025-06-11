import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiJwtStrategy } from './auth.strategy';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  providers: [ApiJwtStrategy],
  exports: [],
})
export class AuthModule {}
