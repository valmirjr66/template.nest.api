import { ApiProperty } from '@nestjs/swagger';

export default class MediaAttachmentDto {
  constructor(media: Express.Multer.File) {
    this.media = media;
  }

  @ApiProperty({ type: 'string', format: 'binary' })
  media: Express.Multer.File;
}
