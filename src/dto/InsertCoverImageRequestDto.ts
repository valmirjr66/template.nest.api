import { ApiProperty } from '@nestjs/swagger';

export default class InsertCoverImageRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  coverImage: Express.Multer.File;
}
