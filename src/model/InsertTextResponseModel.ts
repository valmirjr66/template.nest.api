export default class InsertTextResponseModel {
  constructor(id: string, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  id: string;
  title: string;
  content: string;
}
