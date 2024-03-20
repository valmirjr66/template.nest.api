import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import BlobManager from 'blob/BlobManager';
import GetTextResponseDto from 'dto/GetTextResponseDto';
import AttachMediaRequestDto from 'dto/AttachMediaRequestDto';
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
    return this.textRepository.getTextById(id);
  }

  async getAllTexts(): Promise<GetTextResponseDto[]> {
    return this.textRepository.getAllTexts();
  }

  async insertText(text: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    return this.textRepository.insertText(text);
  }

  async attachMedia(dto: AttachMediaRequestDto): Promise<string> {
    const textExists = (await this.textRepository.countById(dto.id)) !== 0;

    if (!textExists) {
      throw new BadRequestException("Id doesn't match any text");
    }

    try {
      const fileExtension = dto.media.originalname.split('.').pop();
      const randomGuid = uuidv4();

      await this.blobManager.write(
        `${dto.id}/${randomGuid}.${fileExtension}`,
        dto.media.buffer,
      );

      return randomGuid;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
