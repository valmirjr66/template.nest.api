import { Module } from '@nestjs/common';
import TextController from './controler/TextController';
import TextService from './service/TextService';

@Module({
  imports: [],
  controllers: [TextController],
  providers: [TextService],
})
export class AppModule {}
