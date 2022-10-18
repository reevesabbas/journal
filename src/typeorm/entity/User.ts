import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./index";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username!: string;

  @OneToMany(() => Entry, (entry) => entry.user)
  entries!: Entry[];

}