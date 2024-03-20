export default class InsertTextRequestModel {
  constructor(title: string, content: string, publicationDate: Date) {
    this.title = title;
    this.content = content;
    this.publicationDate = publicationDate;
  }

  title: string;
  content: string;
  publicationDate: Date;
}
