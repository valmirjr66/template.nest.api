import { AttachmentEntity } from 'entity/AttachmentEntity';
import { TextEntity } from 'entity/TextEntity';
import AttachmentRepository from './AttachmentRepository';
import DataManager from './DataManager';
import TextRepository from './TextRepository';
import mainDataSource from './MainDataSource';

export default class SimpleDataManager extends DataManager {
  constructor() {
    super(
      new TextRepository(TextEntity, mainDataSource.manager),
      new AttachmentRepository(AttachmentEntity, mainDataSource.manager),
    );
  }
}
