import "reflect-metadata"
import { DataSource } from "typeorm"

import { Entry } from "./entity"
import { User } from "./entity/User"


export const AppDataSource = new DataSource({
  database: 'mydb',
  driver: require('expo-sqlite'),
  type: 'expo',
  entities: [User, Entry],
  synchronize: true,
})