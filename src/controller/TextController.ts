import { Controller, Get, Post } from '@nestjs/common';
import GetTextsResponseDto from 'src/dto/GetTextsResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';
import TextService from 'src/service/TextService';

@Controller('texts')
export default class TextController {
  constructor(private readonly textService: TextService) {}

  @Get()
  async getTexts(): Promise<GetTextsResponseDto> {
    return await this.textService.getTexts();
  }

  @Post()
  async insertText(text: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    return await this.textService.insertText(text);
  }
}
