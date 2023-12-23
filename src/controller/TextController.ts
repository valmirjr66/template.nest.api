import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import GetTextResponseDto from 'src/dto/GetTextResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';
import TextService from 'src/service/TextService';

@ApiTags('texts')
@Controller('texts')
export default class TextController {
  constructor(private readonly textService: TextService) {}

  @Get(':id')
  async getById(id: string): Promise<GetTextResponseDto> {
    return await this.textService.getById(id);
  }

  @Get()
  async getAll(): Promise<GetTextResponseDto[]> {
    return await this.textService.getAll();
  }

  @Post()
  async insert(
    @Body() text: InsertTextRequestDto,
  ): Promise<InsertTextResponseDto> {
    return await this.textService.insert(text);
  }
}
