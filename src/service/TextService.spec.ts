import BlobManager from 'blob/BlobManager';
import DataManagerFactory from 'repository/DataManagerFactory';
import { v4 as uuidv4 } from 'uuid';
import TextRepository from '../repository/TextRepository';
import TextService from './TextService';

jest.mock('../repository/TextRepository');
jest.mock('../repository/AttachmentRepository');

const mockedTextRepo = jest.mocked(TextRepository);

describe('Text Service', () => {
  const textService = new TextService(
    new BlobManager(),
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

  beforeAll(() => {
    mockedTextRepo.prototype.findById.mockResolvedValue(SAMPLE_TEXT_MODEL);
    mockedTextRepo.prototype.findAll.mockResolvedValue([SAMPLE_TEXT_MODEL]);
    mockedTextRepo.prototype.save.mockResolvedValue(SAMPLE_TEXT_MODEL);
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
});
