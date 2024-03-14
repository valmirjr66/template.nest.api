import BlobManager from 'blob/BlobManager';
import TextRepository from 'repository/TextRepository';
import TextService from './TextService';

describe('Text Service', () => {
  let textService: TextService;

  const SAMPLE_TEXT_MODEL = {
    id: '1',
    title: 'Sample title',
    content: 'Sample content',
  };

  beforeEach(() => {
    const textRepository = new TextRepository();
    const blobManager = new BlobManager();

    jest
      .spyOn(textRepository, 'getAllTexts')
      .mockImplementation(async () => [SAMPLE_TEXT_MODEL]);

    jest
      .spyOn(textRepository, 'getTextById')
      .mockImplementation(async () => SAMPLE_TEXT_MODEL);

    jest
      .spyOn(textRepository, 'insertText')
      .mockImplementation(async () => SAMPLE_TEXT_MODEL);

    textService = new TextService(textRepository, blobManager);
  });

  it('Should return the sample text', async () => {
    textService
      .getTextById('1')
      .then((data) => expect(data).toStrictEqual(SAMPLE_TEXT_MODEL));
  });

  it('Should return a list of texts', async () => {
    textService
      .getAllTexts()
      .then((data) => expect(data).toStrictEqual([SAMPLE_TEXT_MODEL]));
  });

  it('Should successfuly insert a new text', async () => {
    textService
      .insertText(SAMPLE_TEXT_MODEL)
      .then((data) => expect(data).toStrictEqual(SAMPLE_TEXT_MODEL));
  });
});
