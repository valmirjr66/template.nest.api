import { Injectable } from '@nestjs/common';
import BaseRepository from './BaseRepository';
import TextModel from 'src/model/TextModel';
import InsertTextRequestDto from 'src/dto/InsertTextRequestDto';

@Injectable()
export default class TextRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getById(id: string): Promise<TextModel> {
    return await this.prisma.text.findUnique({ where: { id: id } });
  }

  async getAll(): Promise<TextModel[]> {
    return await this.prisma.text.findMany();
  }

  async insert(text: InsertTextRequestDto): Promise<TextModel> {
    return await this.prisma.text.create({ data: text });
  }
}
