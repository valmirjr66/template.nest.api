import 'reflect-metadata';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import IEntity from './IEntity';
import { TextEntity } from './TextEntity';

@Entity({ name: 'Attachments' })
export class AttachmentEntity implements IEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => TextEntity, (text) => text.attachments)
  text: TextEntity;

  @Column('uuid')
  textId: string;

  @Column()
  fileExtension: string;

  @Column()
  publicationDate: Date;
}
