import { Injectable } from '@nestjs/common';
import TextRepository from 'src/repository/TextRepository';
import GetTextsResponseDto from '../dto/GetTextsResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';

@Injectable()
export default class TextService {
  constructor(private readonly textRepository: TextRepository) {}

  async getTexts(): Promise<GetTextsResponseDto> {
    return await this.textRepository.getAll();
  }

  async insertText(text: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    return await this.textRepository.insertText(text);
  }
}
