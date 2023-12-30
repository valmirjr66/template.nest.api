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
  @ApiOkResponse({ description: ResponseDescriptions.OK })
  @ApiNotFoundResponse({ description: ResponseDescriptions.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  async getTextById(@Param('id') id: string): Promise<GetTextResponseDto> {
    const response = await this.textService.getTextById(id);
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
    const response = await this.textService.getAllTexts();
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
    return await this.textService.insertText(text);
  }

  @Post(':id/cover-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage'))
  @ApiCreatedResponse({ description: ResponseDescriptions.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescriptions.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescriptions.INTERNAL_SERVER_ERROR,
  })
  @ApiBody({
    type: InsertCoverImageRequestDto,
  })
  async insertCoverImage(
    @UploadedFile() coverImage: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<string> {
    return await this.textService.insertCoverImage(id, coverImage);
  }
}
