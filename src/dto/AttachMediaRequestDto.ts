export default class AttachMediaRequestDto {
  constructor(textId: string, media: Express.Multer.File) {
    this.textId = textId;
    this.media = media;
  }

  textId: string;
  media: Express.Multer.File;
}
