import { Module } from '@nestjs/common';
import TextController from './controller/TextController';
import TextService from './service/TextService';
import TextRepository from './repository/TextRepository';

@Module({
  imports: [],
  controllers: [TextController],
  providers: [TextService, TextRepository],
})
export class AppModule {}
