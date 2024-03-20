import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

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
}
