import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import ResponseDescriptions from 'src/constants/ResponseDescriptions';
import GetTextResponseDto from 'src/dto/GetTextResponseDto';
import InsertCoverImageRequestDto from 'src/dto/InsertCoverImageRequestDto';
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
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  async getTextById(@Param('id') id: string): Promise<GetTextResponseDto> {
    const response = await this.textService.getTextById(id);
    this.validateGetResponse(response);
    return response;
  }

  @Get()
  @ApiNoContentResponse({ description: ResponseDescriptions.NO_CONTENT })
  async getAllTexts(): Promise<GetTextResponseDto[]> {
    const response = await this.textService.getAllTexts();
    this.validateGetResponse(response);
    return response;
  }

  @Post()
  @ApiBadRequestResponse({ description: ResponseDescriptions.BAD_REQUEST })
  async insertText(
    @Body() text: InsertTextRequestDto,
  ): Promise<InsertTextResponseDto> {
    return await this.textService.insertText(text);
  }

  @Post('cover-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiBadRequestResponse({ description: ResponseDescriptions.BAD_REQUEST })
  @ApiBody({
    type: InsertCoverImageRequestDto,
  })
  async insertCoverImage(@UploadedFile() coverImage: Express.Multer.File) {
    return await this.textService.insertCoverImage(coverImage);
  }
}
