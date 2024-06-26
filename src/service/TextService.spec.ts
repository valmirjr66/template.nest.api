import BlobManager from 'blob/BlobManager';
import InsertAttachmentRequestModel from 'model/InsertAttachmentRequestModel';
import DataManagerFactory from 'repository/DataManagerFactory';
import { v4 as uuidv4 } from 'uuid';
import AttachmentRepository from '../repository/AttachmentRepository';
import TextRepository from '../repository/TextRepository';
import TextService from './TextService';

const mockedTextRepo = jest.mocked(TextRepository);
const mockedAttachmentRepo = jest.mocked(AttachmentRepository);
const mockedBlobManager = jest.mocked(BlobManager);

jest.mock('../repository/TextRepository');
jest.mock('../repository/AttachmentRepository');
jest.mock('../blob/BlobManager');
jest.mock('../repository/TransactionalDataManager', () => ({
  default: jest.fn().mockImplementation(() => {
    return {
      beginTransaction: () => {},
      commitTransaction: () => {},
      rollbackTransaction: () => {},
      textRepository: mockedTextRepo.prototype,
      attachmentRepository: mockedAttachmentRepo.prototype,
    };
  }),
}));

describe('Text Service', () => {
  const textService = new TextService(
    mockedBlobManager.prototype,
    new DataManagerFactory(),
  );

  const SAMPLE_TEXT_DTO = {
    title: 'Sample title',
    content: 'Sample content',
  };

  const SAMPLE_TEXT_MODEL = {
    ...SAMPLE_TEXT_DTO,
    id: uuidv4(),
    publicationDate: new Date(),
    attachments: [],
  };

  const SAMPLE_ATTACHMENT_MODEL = {
    id: uuidv4(),
    fileExtension: 'png',
    publicationDate: new Date(),
    text: SAMPLE_TEXT_MODEL,
    textId: SAMPLE_TEXT_MODEL.id,
  };

  const SAMPLE_MEDIA_DTO = {
    textId: uuidv4(),
    media: <Express.Multer.File>{
      originalname: 'file.png',
      buffer: Buffer.from('xyz'),
    },
  };

  beforeAll(() => {
    mockedTextRepo.prototype.countById.mockResolvedValue(1);
    mockedTextRepo.prototype.findById.mockResolvedValue(SAMPLE_TEXT_MODEL);
    mockedTextRepo.prototype.findAll.mockResolvedValue([SAMPLE_TEXT_MODEL]);
    mockedTextRepo.prototype.save.mockResolvedValue(SAMPLE_TEXT_MODEL);
    mockedAttachmentRepo.prototype.findByTextId.mockResolvedValue([
      SAMPLE_ATTACHMENT_MODEL,
    ]);
    mockedAttachmentRepo.prototype.save.mockResolvedValue(
      SAMPLE_ATTACHMENT_MODEL,
    );
  });

  it('Should return the sample text', async () => {
    const { id } = SAMPLE_TEXT_MODEL;
    const result = await textService.getTextById(id);
    expect(mockedTextRepo.prototype.findById).toHaveBeenCalledWith(id);
    expect(result).toStrictEqual(SAMPLE_TEXT_MODEL);
  });

  it('Should return a list of texts', async () => {
    const result = await textService.getAllTexts();
    expect(mockedTextRepo.prototype.findAll).toHaveBeenCalled();
    expect(result).toStrictEqual([SAMPLE_TEXT_MODEL]);
  });

  it('Should successfuly insert a new text', async () => {
    const result = await textService.insertText(SAMPLE_TEXT_DTO);

    expect(mockedTextRepo.prototype.save).toHaveBeenCalledWith({
      ...SAMPLE_TEXT_DTO,
      publicationDate: expect.any(Date),
    });

    expect(result).toStrictEqual(SAMPLE_TEXT_MODEL);
  });

  it('Should throw a bad request exception (text not found)', async () => {
    mockedTextRepo.prototype.countById.mockResolvedValueOnce(0);

    try {
      await textService.attachMedia(SAMPLE_MEDIA_DTO);
    } catch (error) {
      const { name, message } = error;
      expect(name).toBe('BadRequestException');
      expect(message).toBe("Id doesn't match any text");
    }
  });

  it('Should successfuly attach a new media file', async () => {
    const result = await textService.attachMedia(SAMPLE_MEDIA_DTO);

    const expectedAttachment = new InsertAttachmentRequestModel(
      expect.any(String),
      'png',
      expect.any(Date),
      SAMPLE_MEDIA_DTO.textId,
    );

    expect(mockedAttachmentRepo.prototype.save).toHaveBeenCalledWith(
      expectedAttachment,
    );

    expect(result).toStrictEqual(SAMPLE_ATTACHMENT_MODEL);
  });

  it('File writing should fail, forcing the transaction to rollback', async () => {
    mockedBlobManager.prototype.write.mockImplementationOnce(async () => {
      throw 'Error';
    });

    try {
      await textService.attachMedia(SAMPLE_MEDIA_DTO);
    } catch (error) {
      expect(error.name).toBe('InternalServerErrorException');
    }
  });

  it('Should return all related attachments', async () => {
    const textId = SAMPLE_ATTACHMENT_MODEL.textId;

    const result = await textService.getTextAttachments(textId);

    expect(mockedAttachmentRepo.prototype.findByTextId).toHaveBeenCalledWith(
      textId,
    );

    expect(result).toStrictEqual([SAMPLE_ATTACHMENT_MODEL]);
  });
});
