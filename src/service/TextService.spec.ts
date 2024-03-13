import BlobManager from 'blob/BlobManager';
import TextModel from 'model/TextModel';
import TextRepository from 'repository/TextRepository';
import TextService from './TextService';

describe('TextService', () => {
  let textService: TextService;

  const SAMPLE_TEXT_MODEL = new TextModel(
    '1',
    'Sample title',
    'Sample content',
  );

  beforeEach(() => {
    const textRepository = new TextRepository();
    const blobManager = new BlobManager();

    jest
      .spyOn(textRepository, 'getAllTexts')
      .mockImplementation(async () => [SAMPLE_TEXT_MODEL]);

    textService = new TextService(textRepository, blobManager);
  });

  describe('findAll', () => {
    it('should return a list of texts', async () => {
      textService
        .getAllTexts()
        .then((data) => expect(data).toStrictEqual([SAMPLE_TEXT_MODEL]));
    });
  });
});
