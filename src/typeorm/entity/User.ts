import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./index";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username!: string;

  @OneToMany(() => Entry, (entry) => entry.user)
  entries!: Entry[];

}