import { MaxLength } from 'class-validator';

export default class InsertTextRequestDto {
  @MaxLength(50)
  title: string;

  content: string;
}
