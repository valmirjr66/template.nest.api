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
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import ResponseDescriptions from 'constants/ResponseDescriptions';
import GetTextResponseDto from 'dto/GetTextResponseDto';
import InsertTextRequestDto from 'dto/InsertTextRequestDto';
import InsertTextResponseDto from 'dto/InsertTextResponseDto';
import MediaAttachmentDto from 'dto/MediaAttachmentDto';
import TextService from 'service/TextService';
import BaseController from './BaseController';
import AttachMediaRequestDto from 'dto/AttachMediaRequestDto';

@ApiTags('Text')
@Controller('texts')
export default class TextController extends BaseController {
  constructor(private readonly textService: TextService) {
    super();
  }

  @Get(':id')
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async getTextById(@Param('id') id: string): Promise<GetTextResponseDto> {
    const response = this.textService.getTextById(id);
    this.validateGetResponse(response);
    return response;
  }

  @Get()
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNoContentResponse({ description: ResponseDescriptions.NO_CONTENT })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async getAllTexts(): Promise<GetTextResponseDto[]> {
    const response = this.textService.getAllTexts();
    this.validateGetResponse(response);
    return response;
  }

  @Post()
  @ApiCreatedResponse({ description: ResponseDescriptions.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescriptions.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async insertText(
    @Body() text: InsertTextRequestDto,
  ): Promise<InsertTextResponseDto> {
    return this.textService.insertText(text);
  }

  @Post(':textId/media')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('media'))
  @ApiCreatedResponse({ description: ResponseDescriptions.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescriptions.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({
    type: MediaAttachmentDto,
  })
  async attachMedia(
    @UploadedFile() media: Express.Multer.File,
    @Param('textId') textId: string,
  ): Promise<string> {
    const dto = new AttachMediaRequestDto(textId, media);
    return this.textService.attachMedia(dto);
  }
}
