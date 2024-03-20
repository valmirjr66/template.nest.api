import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import BlobManager from 'blob/BlobManager';
import AttachMediaRequestDto from 'dto/AttachMediaRequestDto';
import GetTextResponseDto from 'dto/GetTextResponseDto';
import InsertTextRequestDto from 'dto/InsertTextRequestDto';
import InsertTextResponseDto from 'dto/InsertTextResponseDto';
import InsertAttachmentRequestModel from 'model/InsertAttachmentRequestModel';
import InsertTextRequestModel from 'model/InsertTextRequestModel';
import AttachmentRepository from 'repository/AttachmentRepository';
import TextRepository from 'repository/TextRepository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class TextService {
  constructor(
    private readonly textRepository: TextRepository,
    private readonly attachmentRepository: AttachmentRepository,
    private readonly blobManager: BlobManager,
  ) {}

  async getTextById(id: string): Promise<GetTextResponseDto> {
    return this.textRepository.getById(id);
  }

  async getAllTexts(): Promise<GetTextResponseDto[]> {
    return this.textRepository.getAll();
  }

  async insertText(dto: InsertTextRequestDto): Promise<InsertTextResponseDto> {
    const model = new InsertTextRequestModel(
      dto.title,
      dto.content,
      new Date(),
    );

    return this.textRepository.insert(model);
  }

  async attachMedia(dto: AttachMediaRequestDto): Promise<string> {
    const textExists = (await this.textRepository.countById(dto.id)) !== 0;

    if (!textExists) {
      throw new BadRequestException("Id doesn't match any text");
    }

    try {
      const fileExtension = dto.media.originalname.split('.').pop();
      const randomGuid = uuidv4();

      const attachment = new InsertAttachmentRequestModel(
        randomGuid,
        fileExtension,
        new Date(),
        dto.id,
      );

      await this.attachmentRepository.insert(attachment);

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
