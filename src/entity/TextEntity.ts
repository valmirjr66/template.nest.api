import 'reflect-metadata';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttachmentEntity } from './AttachmentEntity';
import IEntity from './IEntity';

@Entity({ name: 'Texts' })
export class TextEntity implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  publicationDate: Date;

  @OneToMany(() => AttachmentEntity, (attachment) => attachment.text)
  attachments: AttachmentEntity[];
}
