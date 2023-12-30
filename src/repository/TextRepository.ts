import { Injectable } from '@nestjs/common';
import BaseRepository from './BaseRepository';
import TextModel from 'src/model/TextModel';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';

@Injectable()
export default class TextRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getTextById(id: string): Promise<TextModel> {
    return await this.prisma.text.findUnique({ where: { id: id } });
  }

  async getAllTexts(): Promise<TextModel[]> {
    return await this.prisma.text.findMany();
  }

  async insertText(text: InsertTextRequestDto): Promise<TextModel> {
    return await this.prisma.text.create({ data: text });
  }
}
