export default class AttachMediaRequestDto {
  constructor(id: string, media: Express.Multer.File) {
    this.id = id;
    this.media = media;
  }

  id: string;
  media: Express.Multer.File;
}
