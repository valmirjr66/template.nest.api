import { Guid } from 'guid-typescript';

export default class GetTextResponseDto {
  id: Guid;
  title: string;
  content: string;

  constructor(id: Guid, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
