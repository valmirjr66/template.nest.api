import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import GetTextResponseDto from 'src/dto/GetTextResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';
import TextService from 'src/service/TextService';
import BaseController from './BaseController';

@ApiTags('Text')
@Controller('texts')
export default class TextController extends BaseController {
  constructor(private readonly textService: TextService) {
    super();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Not found' })
  async getById(@Param('id') id: string): Promise<GetTextResponseDto> {
    const response = await this.textService.getById(id);
    this.validateGetResponse(response);
    return response;
  }

  @Get()
  @ApiNoContentResponse({ description: 'No content' })
  async getAll(): Promise<GetTextResponseDto[]> {
    const response = await this.textService.getAll();
    this.validateGetResponse(response);
    return response;
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Bad request' })
  async insert(
    @Body() text: InsertTextRequestDto,
  ): Promise<InsertTextResponseDto> {
    return await this.textService.insert(text);
  }
}
