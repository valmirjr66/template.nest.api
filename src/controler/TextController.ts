import { Controller, Get } from '@nestjs/common';
import GetTextsResponseDto from 'src/dto/GetTextsResponseDto';
import TextService from 'src/service/TextService';

@Controller('texts')
export default class TextController {
  constructor(private readonly textService: TextService) {}

  @Get()
  getTexts(): GetTextsResponseDto {
    return this.textService.getTexts();
  }
}
