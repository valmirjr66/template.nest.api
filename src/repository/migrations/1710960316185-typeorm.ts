import { MigrationInterface, QueryRunner } from 'typeorm';

export class Typeorm1710960316185 implements MigrationInterface {
  name = 'Typeorm1710960316185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Texts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "publicationDate" datetime NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Texts"`);
  }
}
