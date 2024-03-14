import { ApiProperty } from '@nestjs/swagger';

export default class InsertCoverImageRequestDto {
  constructor(coverImage: Express.Multer.File) {
    this.coverImage = coverImage;
  }

  @ApiProperty({ type: 'string', format: 'binary' })
  coverImage: Express.Multer.File;
}
