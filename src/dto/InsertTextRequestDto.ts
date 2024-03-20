import { Length } from 'class-validator';

export default class InsertTextRequestDto {
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  @Length(3, 50)
  title: string;

  @Length(30, 1500)
  content: string;
}
