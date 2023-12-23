import { Injectable } from '@nestjs/common';
import GetTextResponseDto from 'src/dto/GetTextResponseDto';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';
import InsertTextResponseDto from 'src/dto/InsertTextResponseDto';
import TextRepository from 'src/repository/TextRepository';

@Injectable()
export default class TextService {
  constructor(private readonly textRepository: TextRepository) {}

  async getById(id: string): Promise<GetTextResponseDto> {
    return await this.textRepository.getById(id);
  }

  async getAll(): Promise<GetTextResponseDto[]> {
    return await this.textRepository.getAll();
  }

  async insert(text: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    return await this.textRepository.insert(text);
  }
}
