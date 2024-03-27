import { AttachmentEntity } from 'entity/AttachmentEntity';
import { TextEntity } from 'entity/TextEntity';
import { QueryRunner } from 'typeorm';
import AttachmentRepository from './AttachmentRepository';
import DataManager from './DataManager';
import mainDataSource from './MainDataSource';
import TextRepository from './TextRepository';

export default class TransactionalDataManager extends DataManager {
  private readonly queryRunner: QueryRunner;

  constructor() {
    const queryRunner = mainDataSource.createQueryRunner();
    const entityManager = queryRunner.manager;

    super(
      new TextRepository(TextEntity, entityManager),
      new AttachmentRepository(AttachmentEntity, entityManager),
    );

    this.queryRunner = queryRunner;
  }

  public async beginTransaction() {
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction() {
    await this.queryRunner.commitTransaction();
  }

  public async rollbackTransaction() {
    await this.queryRunner.rollbackTransaction();
  }
}
