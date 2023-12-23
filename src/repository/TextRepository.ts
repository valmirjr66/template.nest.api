import { Injectable } from '@nestjs/common';
import BaseRepository from './BaseRepostory';
import TextModel from 'src/model/TextModel';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';

@Injectable()
export default class TextRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getAll(): Promise<TextModel[]> {
    return await this.prisma.text.findMany();
  }

  async insertText(text: InsertTextRequestDto): Promise<TextModel> {
    return await this.prisma.text.create({ data: text });
  }
}
