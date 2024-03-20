import { AttachmentEntity } from 'entity/AttachmentEntity';
import { TextEntity } from 'entity/TextEntity';
import { DataSource } from 'typeorm';

const mainDataSource = new DataSource({
  type: 'better-sqlite3',
  database: '.sqlite',
  entities: [TextEntity, AttachmentEntity],
  migrations: [__dirname + '/migrations/*.ts'],
});

export default mainDataSource;
