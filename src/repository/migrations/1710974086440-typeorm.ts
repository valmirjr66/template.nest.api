import { MigrationInterface, QueryRunner } from 'typeorm';

export class Typeorm1710974086440 implements MigrationInterface {
  name = 'Typeorm1710974086440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Texts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "publicationDate" datetime NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "Attachments" ("id" varchar PRIMARY KEY NOT NULL, "textId" varchar NOT NULL, "fileExtension" varchar NOT NULL, "publicationDate" datetime NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_Attachments" ("id" varchar PRIMARY KEY NOT NULL, "textId" varchar NOT NULL, "fileExtension" varchar NOT NULL, "publicationDate" datetime NOT NULL, CONSTRAINT "FK_a9e4ea1a1144374c2f2aad55c72" FOREIGN KEY ("textId") REFERENCES "Texts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Attachments"("id", "textId", "fileExtension", "publicationDate") SELECT "id", "textId", "fileExtension", "publicationDate" FROM "Attachments"`,
    );
    await queryRunner.query(`DROP TABLE "Attachments"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_Attachments" RENAME TO "Attachments"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Attachments" RENAME TO "temporary_Attachments"`,
    );
    await queryRunner.query(
      `CREATE TABLE "Attachments" ("id" varchar PRIMARY KEY NOT NULL, "textId" varchar NOT NULL, "fileExtension" varchar NOT NULL, "publicationDate" datetime NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "Attachments"("id", "textId", "fileExtension", "publicationDate") SELECT "id", "textId", "fileExtension", "publicationDate" FROM "temporary_Attachments"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Attachments"`);
    await queryRunner.query(`DROP TABLE "Attachments"`);
    await queryRunner.query(`DROP TABLE "Texts"`);
  }
}
