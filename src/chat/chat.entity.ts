import type { Chat } from 'telegram-typings';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ChatEntity implements Chat {
  @PrimaryColumn({ unique: true })
  id!: number;

  @Column()
  type!: string;

  // should be true by default
  @Column()
  isActive!: boolean;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  title?: string;
}
