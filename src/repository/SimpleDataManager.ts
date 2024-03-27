import { AttachmentEntity } from 'entity/AttachmentEntity';
import { TextEntity } from 'entity/TextEntity';
import AttachmentRepository from './AttachmentRepository';
import DataManager from './DataManager';
import mainDataSource from './MainDataSource';
import TextRepository from './TextRepository';

export default class SimpleDataManager extends DataManager {
  constructor() {
    super(
      new TextRepository(TextEntity, mainDataSource.manager),
      new AttachmentRepository(AttachmentEntity, mainDataSource.manager),
    );
  }
}
