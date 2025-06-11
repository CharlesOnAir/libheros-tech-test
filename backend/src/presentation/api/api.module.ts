import { Module } from '@nestjs/common';
import { UserDomainModule } from 'src/domain/user/user.module';
import { AuthentificationModule } from './authentification/authentification.module';

@Module({
  imports: [AuthentificationModule, UserDomainModule],
  controllers: [],
})
export class ApiModule {}
