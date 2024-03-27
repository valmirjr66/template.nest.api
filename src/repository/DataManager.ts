import AttachmentRepository from './AttachmentRepository';
import TextRepository from './TextRepository';

export default abstract class DataManager {
  public readonly textRepository: TextRepository;
  public readonly attachmentRepository: AttachmentRepository;

  constructor(
    textRepository: TextRepository,
    attachmentRepository: AttachmentRepository,
  ) {
    this.textRepository = textRepository;
    this.attachmentRepository = attachmentRepository;
  }
}
