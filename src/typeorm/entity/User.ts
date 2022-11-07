import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./Entry";


@Entity({name: 'user'})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @OneToMany(() => Entry, (entry) => entry.user, {eager: true})
  entries?: Entry[];

}