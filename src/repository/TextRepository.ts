import { Injectable } from '@nestjs/common';
import { TextEntity } from 'entity/TextEntity';
import GetTextResponseModel from 'model/GetTextResponseModel';
import InsertTextRequestModel from 'model/InsertTextRequestModel';
import InsertTextResponseModel from 'model/InsertTextResponseModel';
import mainDataSource from './MainDataSource';

@Injectable()
export default class TextRepository {
  private readonly repository = mainDataSource.getRepository(TextEntity);

  async countById(id: string): Promise<number> {
    return this.repository.countBy({ id });
  }

  async getTextById(id: string): Promise<GetTextResponseModel> {
    return this.repository.findOneBy({ id });
  }

  async getAllTexts(): Promise<GetTextResponseModel[]> {
    return this.repository.find();
  }

  async insertText(
    text: InsertTextRequestModel,
  ): Promise<InsertTextResponseModel> {
    return this.repository.save(text);
  }
}
