import { Injectable } from '@nestjs/common';
import GetTextResponseModel from 'model/GetTextResponseModel';
import InsertTextRequestModel from 'model/InsertTextRequestModel';
import BaseRepository from './BaseRepository';
import InsertTextResponseModel from 'model/InsertTextResponseModel';

@Injectable()
export default class TextRepository extends BaseRepository {
  constructor() {
    super();
  }

  async getTextById(id: string): Promise<GetTextResponseModel> {
    return await this.prisma.text.findUnique({ where: { id: id } });
  }

  async getAllTexts(): Promise<GetTextResponseModel[]> {
    return await this.prisma.text.findMany();
  }

  async insertText(
    text: InsertTextRequestModel,
  ): Promise<InsertTextResponseModel> {
    return await this.prisma.text.create({ data: text });
  }
}
