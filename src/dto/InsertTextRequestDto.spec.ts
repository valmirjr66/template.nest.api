import { validate } from 'class-validator';
import InsertTextRequestDto from './InsertTextRequestDto';

describe('Insert Text Request DTO', () => {
  it('Should validate the DTO successfuly', async () => {
    const dto = new InsertTextRequestDto(
      'title with more than 3 character',
      'content with more than 30 characters',
    );

    const result = await validate(dto);

    expect(result).toHaveLength(0);
  });

  it('Should fail because of the missing properties', async () => {
    const dto = new InsertTextRequestDto(null, null);

    const result = await validate(dto);

    expect(result).toHaveLength(2);

    const titleError = result.find(
      (item) => item.property === 'title',
    ).constraints;

    const contentError = result.find(
      (item) => item.property === 'content',
    ).constraints;

    expect(titleError.isLength).toContain(
      'must be longer than or equal to 3 characters',
    );

    expect(contentError.isLength).toContain(
      'must be longer than or equal to 30 characters',
    );
  });

  it('Should fail because of the title/content length', async () => {
    const dto = new InsertTextRequestDto(
      'this is gonna be a long title'.repeat(5),
      'and this is gonna be really long content'.repeat(50),
    );

    const result = await validate(dto);

    expect(result).toHaveLength(2);

    const titleError = result.find(
      (item) => item.property === 'title',
    ).constraints;

    const contentError = result.find(
      (item) => item.property === 'content',
    ).constraints;

    expect(titleError.isLength).toContain(
      'must be shorter than or equal to 50 characters',
    );

    expect(contentError.isLength).toContain(
      'must be shorter than or equal to 1500 characters',
    );
  });
});
