import 'reflect-metadata';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TextEntity } from './TextEntity';
import IEntity from './IEntity';

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
