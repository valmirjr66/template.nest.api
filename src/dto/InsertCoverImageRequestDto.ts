export default class InsertCoverImageRequestDto {
  constructor(id: string, coverImage: Express.Multer.File) {
    this.id = id;
    this.coverImage = coverImage;
  }

  id: string;
  coverImage: Express.Multer.File;
}
