import { Module } from '@nestjs/common';
import TextController from './controller/TextController';
import TextService from './service/TextService';
import TextRepository from './repository/TextRepository';
import BlobManager from './blob/BlobManager';

@Module({
  imports: [],
  controllers: [TextController],
  providers: [TextService, TextRepository, BlobManager],
})
export class AppModule {}
