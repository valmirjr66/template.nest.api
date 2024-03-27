import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DataManagerFactory from 'repository/DataManagerFactory';
import BlobManager from './blob/BlobManager';
import TextController from './controller/TextController';
import TextService from './service/TextService';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TextController],
  providers: [TextService, BlobManager, DataManagerFactory],
})
export class AppModule {}
