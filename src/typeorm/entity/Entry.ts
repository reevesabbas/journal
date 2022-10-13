import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './index'

@Entity('entry')
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @CreateDateColumn()
  date!: Date;

  @Column()
  pinned?: boolean;

  @Index()
  @UpdateDateColumn()
  updatedDate?: Date;

  @ManyToOne(() => User, (user) => user.entries)
  user!: User;

}