export default class InsertAttachmentRequestModel {
  constructor(
    id: string,
    fileExtension: string,
    publicationDate: Date,
    textId: string,
  ) {
    this.id = id;
    this.fileExtension = fileExtension;
    this.publicationDate = publicationDate;
    this.textId = textId;
  }

  id: string;
  fileExtension: string;
  publicationDate: Date;
  textId: string;
}
