import { Injectable } from '@nestjs/common';
import { AttachmentEntity } from 'entity/AttachmentEntity';
import InsertAttachmentRequestModel from 'model/InsertAttachmentRequestModel';
import mainDataSource from './MainDataSource';

@Injectable()
export default class AttachmentRepository {
  private readonly repository = mainDataSource.getRepository(AttachmentEntity);

  async insert(attachment: InsertAttachmentRequestModel): Promise<void> {
    await this.repository.save(attachment);
  }
}
