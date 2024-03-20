import { TextEntity } from 'entity/TextEntity';
import { DataSource } from 'typeorm';

const mainDataSource = new DataSource({
  type: 'better-sqlite3',
  database: '.sqlite',
  entities: [TextEntity],
  migrations: [__dirname + '/migrations/*.ts'],
});

export default mainDataSource;
