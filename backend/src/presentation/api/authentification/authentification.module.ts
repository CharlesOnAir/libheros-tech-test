import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';

@Module({
  imports: [],
  controllers: [AuthentificationController],
})
export class AuthentificationModule {}
