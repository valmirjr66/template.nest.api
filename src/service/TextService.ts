import { Injectable } from '@nestjs/common';
import BlobManager from 'src/blob/BlobManager';
import GetTextResponseDto from 'src/dto/GetTextResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';
import TextRepository from 'src/repository/TextRepository';

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

  async insertCoverImage(coverImage: Express.Multer.File): Promise<void> {
    try {
      await this.blobManager.write(coverImage.originalname, coverImage.buffer);
    } catch (err) {
      console.error(err);
    }
  }
}
