import { Module } from '@nestjs/common';
import AttachmentRepository from 'repository/AttachmentRepository';
import BlobManager from './blob/BlobManager';
import TextController from './controller/TextController';
import TextRepository from './repository/TextRepository';
import TextService from './service/TextService';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TextController],
  providers: [TextService, TextRepository, AttachmentRepository, BlobManager],
})
export class AppModule {}
