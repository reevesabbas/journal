import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {User} from './index'

@Entity('entry')
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @CreateDateColumn()
  date?: Date;

}