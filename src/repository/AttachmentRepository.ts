import { AttachmentEntity } from 'entity/AttachmentEntity';
import GetAttachmentResponseModel from 'model/GetAttachmentResponseModel';
import BaseRepository from './BaseRepository';

export default class AttachmentRepository extends BaseRepository<AttachmentEntity> {
  async findByTextId(textId: string): Promise<GetAttachmentResponseModel[]> {
    return this.findBy({ textId });
  }
}
