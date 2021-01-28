import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'en' })
  lang!: string;

  @Column()
  phrase!: string;
}
