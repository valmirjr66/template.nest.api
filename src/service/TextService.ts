import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import BlobManager from 'blob/BlobManager';
import AttachMediaRequestDto from 'dto/AttachMediaRequestDto';
import AttachMediaResponseDto from 'dto/AttachMediaResponseDto';
import GetTextResponseDto from 'dto/GetTextResponseDto';
import InsertTextRequestDto from 'dto/InsertTextRequestDto';
import InsertTextResponseDto from 'dto/InsertTextResponseDto';
import InsertAttachmentRequestModel from 'model/InsertAttachmentRequestModel';
import InsertTextRequestModel from 'model/InsertTextRequestModel';
import DataManagerFactory from 'repository/DataManagerFactory';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class TextService {
  constructor(
    private readonly blobManager: BlobManager,
    private readonly dataManagerFactory: DataManagerFactory,
  ) {}

  async getTextById(id: string): Promise<GetTextResponseDto> {
    return this.dataManagerFactory.getSimple().textRepository.findById(id);
  }

  async getAllTexts(): Promise<GetTextResponseDto[]> {
    return this.dataManagerFactory.getSimple().textRepository.findAll();
  }

  async insertText(dto: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    const model = new InsertTextRequestModel(
      dto.title,
      dto.content,
      new Date(),
    );

    return this.dataManagerFactory.getSimple().textRepository.save(model);
  }

  async attachMedia(
    dto: AttachMediaRequestDto,
  ): Promise<AttachMediaResponseDto> {
    const textExists =
      (await this.dataManagerFactory
        .getSimple()
        .textRepository.countById(dto.textId)) !== 0;

    if (!textExists) {
      throw new BadRequestException("Id doesn't match any text");
    }

    const transactionalDataManager = this.dataManagerFactory.getTransactional();

    try {
      await transactionalDataManager.beginTransaction();

      const fileExtension = dto.media.originalname.split('.').pop();
      const randomGuid = uuidv4();

      const attachment = new InsertAttachmentRequestModel(
        randomGuid,
        fileExtension,
        new Date(),
        dto.textId,
      );

      const response =
        await transactionalDataManager.attachmentRepository.save(attachment);

      await this.blobManager.write(
        `${dto.textId}/${randomGuid}.${fileExtension}`,
        dto.media.buffer,
      );

      await transactionalDataManager.commitTransaction();

      return response;
    } catch (err) {
      await transactionalDataManager.rollbackTransaction();
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
