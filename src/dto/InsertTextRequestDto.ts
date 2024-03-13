import { MaxLength } from 'class-validator';

export default class InsertTextRequestDto {
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  @MaxLength(50)
  title: string;

  content: string;
}
