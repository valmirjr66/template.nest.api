export default class InsertTextRequestModel {
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  title: string;
  content: string;
}
