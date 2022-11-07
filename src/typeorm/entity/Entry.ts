import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

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

  @UpdateDateColumn({array: true})
  updatedDate?: Date[];

  @ManyToOne(() => User, (user) => user.entries, {cascade: true})
  user!: User;

}