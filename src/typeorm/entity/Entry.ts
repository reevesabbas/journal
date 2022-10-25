import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}