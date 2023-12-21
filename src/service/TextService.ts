import { Injectable } from '@nestjs/common';
import GetTextsResponseDto from '../dto/GetTextsResponseDto';
import { Guid } from 'guid-typescript';

@Injectable()
export default class TextService {
  constructor() {}

  getTexts(): GetTextsResponseDto {
    return new GetTextsResponseDto([
      {
        id: Guid.create(),
        title: 'Teste 1',
        content: 'Foo bar.',
      },
    ]);
  }
}
