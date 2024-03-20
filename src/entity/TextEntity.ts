import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { AttachmentEntity } from './AttachmentEntity';

@Entity({ name: 'Texts' })
export class TextEntity {
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
