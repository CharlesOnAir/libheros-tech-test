import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domain/user/user.module';
import { AuthentificationController } from './authentification.controller';

@Module({
  imports: [UserDomainModule],
  controllers: [AuthentificationController],
})
export class AuthentificationModule {}
