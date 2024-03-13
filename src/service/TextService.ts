import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import BlobManager from 'blob/BlobManager';
import GetTextResponseDto from 'dto/GetTextResponseDto';
import InsertTextRequestDto from 'dto/InsertTextRequestDto';
import InsertTextResponseDto from 'dto/InsertTextResponseDto';
import TextRepository from 'repository/TextRepository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class TextService {
  constructor(
    private readonly textRepository: TextRepository,
    private readonly blobManager: BlobManager,
  ) {}

  async getTextById(id: string): Promise<GetTextResponseDto> {
    return await this.textRepository.getTextById(id);
  }

  async getAllTexts(): Promise<GetTextResponseDto[]> {
    return await this.textRepository.getAllTexts();
  }

  async insertText(text: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    return await this.textRepository.insertText(text);
  }

  async insertCoverImage(
    id: string,
    coverImage: Express.Multer.File,
  ): Promise<string> {
    if (!(await this.textRepository.getTextById(id))) {
      throw new BadRequestException("Id doesn't match any text");
    }

    try {
      const fileExtension = coverImage.originalname.split('.').pop();
      const randomGuid = uuidv4();

      await this.blobManager.write(
        `${id}/${randomGuid}.${fileExtension}`,
        coverImage.buffer,
      );

      return randomGuid;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
