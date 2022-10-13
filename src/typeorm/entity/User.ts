import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./index";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Entry, (entry) => entry.user)
  entries!: Entry[];

}