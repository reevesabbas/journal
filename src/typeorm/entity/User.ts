import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email!: string;

  @Column()
  displayName!: string;

  @Column()
  password!: string;

}